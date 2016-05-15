---

layout: post
title: View的事件分发机制
category: 技术
tags: android
description: 有关View事件的分发机制

---

> 有关View事件的分发机制

参考书籍:参考书籍： [android开发艺术](http://bornbeauty.github.io/2015/11/06/book-list-of-2015.html#Android开发艺术探索)

参考博客: [郭霖的专栏-Android事件分发机制完全解析，带你从源码的角度彻底理解(上)](http://blog.csdn.net/guolin_blog/article/details/9097463)


# 1.View点击事件的传递规则

首先,用户触摸屏幕的时候系统必须对事件做出相应反应.而这个事件就是产生一个MotionEvent然后按照一定的规则传递给每一个View去进行相应的处理.这就是我们所谓的时间分发了.点击事件的分发主要设计一下几个主要的方法:

	//用来就行事件的分发.如果有事件传递给当前的View,那么该View一定回去调用这个方法
    //返回值受当前View的onTouchEvent和下级View的dispatchTouchEvent的影响
    //返回值表示当前的事件时候已经被处理完成
	public boolean dispatchTouchEvent(MotionEvent e)
    
    //这个方法在上面那个方法中调用,用来判断是够药拦截这个事件
    //如果当前View拦截了某个事件 那么在同一个事件序列中就不会再次被调用
    //返回值表示是否拦截当前事件
    public boolean onInterceptTouchEvent(MotionEvent e)
    
    //也是在第一个方法中去调用 用来处理拦截下来的事件
    //返回值为真表示改事件已经被处理 否则 没有处理 在同一事件序列中
    //View无法再次接收到事件
   public boolean onTouchEvent(MotionEvent e)
    
可以用一段伪代码来表示一下三者的关系:

	public boolean dispatchTouchEvent(MotionEvent e) {
    	boolean consume = false;
        if (onInterceptTouchEvent(e)) {
        	consume = onTouchEvent(e);
       	 } else {
        	cnsume = childView.dispathcTouchEvent(e);
	}
	return cosume;
    } 
    
从上面的代码中我们基本可以总结出这样的结论:

***对于一个根ViewGroup来说,当接收到一个MotionEvent的时候:***

- 调用dispatchTouchEvent方法
	- 调用onInterceptTouchEvent方法
		- 返回值为true,则表示拦截当前事件,调用onTouchEvent来处理这个事件 
		- 返回值为false,则当前事件将会被传递给childView,childView继续调用dispatchTouchEvent方法

如此往复,直至事件被处理.

***当一个View需要处理一个事件的时候***

- 如果该View设置了onTouchListener,则会调用onTouch方法
	- 如果onTouch方法返回false,则去调用onTouchEvent
		- 如果设置了onClickListener,那么在onTouchEvent方法中将会调用onClick方法
	- 反之,onTouchEvent则不会被调用

当一个事件产生的时候,它的传递过程遵循这样的过程:Activity->Windows->View;事件总是先传递给Activity,Activity在传递给Windows,Windows在传递给View;如果View将事件处理了,则该事件相应就结束了.否则,事件将一级一级的继续返回,最终会传递给Activity的onTouchEvent处理.

	@Override
    public boolean onTouchEvent(MotionEvent event) {
        Toast.makeText(MainActivity.this, event.getAction() + "我是Activity", Toast.LENGTH_SHORT).show();
        return super.onTouchEvent(event);
    }

当你没有给任何控件设置相应事件的时候(也就是都会返回false),那么你就会看到Activity的onTouchEvent被调用了.

在[android开发艺术](http://bornbeauty.github.io/2015/11/06/book-list-of-2015.html#Android开发艺术探索)这本书中提到了几个结论:

>1.同一个事件序列是指手指接触屏幕那一刻起,到手指离开屏幕那一刻结束,在这个过程中所有产生的事件都属于这一个事件序列.包括一个ACTION_DOWN,一个ACTION_UP和n个ACTION_MOVE;

>2.某一个View一旦决定拦截事件,那么这一事件序列都只能由它来处理.

这个结论认真想了一下,似乎有点问题;假如这个View我设置了onTouchListener,但是我怡然返回false,这个事件序列仍然会传递给父View,当然了,这个View也只能接收到一个ACTION_DOWN事件,ACTION_UP和ACTION_MOVE不会接收到.假如这个View同时还设置了onClickListener,onTouchEvent返回false的时候事件会交给onTouchEvent处理这个事件,不会在交给父View处理了.这个问题还是需要结合源码来看一下;

>3.某个View一旦开始处理一个事件,如果它不消耗ACTION_DOWN事件,那么同一时间序列也不会交给他来处理了.

>4.如果View不消耗ACTION_DWON以外的事件,那么这个点击事件就会消失,不会在交还给父View处理.最后会交回activity处理.

>5.ViewGroup默认不拦截任何事件,他的onInterceptTouch方法默认返回false;View没有onInterceptTouch方法,收到事件他的onTouchEvent事件就会被调用.

>6.View的onTouchEvent默认都会消耗时间(返回true),除非他是不可点击的(clickable和龙Clickable同时为false).View的longClickable默认都是false,clickable分情况.

# 2.Activity对事件的分发


<!-- 么么哒 -->
点击事件用MotionEvent来表示,当点击事件发生的时候,事件最先传递给当前Activity,由Activity的dispatchTouchEvent来进行事件派发,具体工作是由Activity内部的Windows来处理的.Windows会将事件传递给decor view,即当前View的root view.先看一下Activity的dispatchTouchEvent源码:

	//activity#dispatchTouchEnevt
    public boolean diapatchTouchEvent(MotionEvent e) {
    	if (e.getAction() == MotionEvent.ACTION_DOWN) {
        	onUserInteraction();
        }
        if (getWindows.superDispatchTouchEvent()) {
        	return true;
        }
        return onTouchEvent(e);
    }

这里有个`onUserInteraction`方法,点进去发现这个方法是一个空方法,文档是这样写的:

>Called whenever a key, touch, or trackball event is dispatched to the activity. Implement this method if you wish to know that the user has interacted with the device in some way while your activity is running. This callback and onUserLeaveHint() are intended to help activities manage status bar notifications intelligently; specifically, for helping activities determine the proper time to cancel a notfication.
All calls to your activity's onUserLeaveHint() callback will be accompanied by calls to onUserInteraction(). This ensures that your activity will be told of relevant user activity such as pulling down the notification pane and touching an item there.
Note that this callback will be invoked for the touch down action that begins a touch gesture, but may not be invoked for the touch-moved and touch-up actions that follow.

大体意思就是说onUserInteraction是帮助我们知道用户开始和屏幕进行交互的回调函数.另外,还会和`onUserLeaveHint`一起更加智能的管理状态栏通知.

>Called as part of the activity lifecycle when an activity is about to go into the background as the result of user choice. For example, when the user presses the Home key, onUserLeaveHint() will be called, but when an incoming phone call causes the in-call Activity to be automatically brought to the foreground, onUserLeaveHint() will not be called on the activity being interrupted. In cases when it is invoked, this method is called right before the activity's onPause() callback.
This callback and onUserInteraction() are intended to help activities manage status bar notifications intelligently; specifically, for helping activities determine the proper time to cancel a notfication.

这里这两个方法对我们不是很重要了,根据分析可以知道,activity通过windows来分发事件,当所有的view都没有接收处理事件的时候,activity就会自己调用自己的onTouchEvent()来处理这个事件了.

继续看`getWindows.superDispatchTouchEvent()`,`window`是个抽象类,

>Abstract base class for a top-level window look and behavior policy. An instance of this class should be used as the top-level view added to the window manager. It provides standard UI policies such as a background, title area, default key processing, etc.
The only existing implementation of this abstract class is android.view.PhoneWindow, which you should instantiate when needing a Window.

根据文档的描述,我们可以知道`window`的唯一实现类是`android.view.PhoneWindow`,那么他的`dispatchTouchEvent`是怎么实现的呢?

	//PhoneWindow#superDispatchTouchEvent
    public boolean superDispatchTouchEvent(MotionEvent e) {
    	return mDecor.superDispatchTouchEvent(e);
    }

这里的思路很清晰了,直接分发给mDecor处理,那么DecorView是什么东西呢?[关于activity的层次点击这里](http://blog.csdn.net/windskier/article/details/6957854)

	//this is the top-level view of the window,containing the window decor(装饰)
	private final class DecorView extends FrameLayout implements RootViewSurfaceTaker
    
    private DecorView mDecor;
    
    @Override
    public final View getDecorView() {
    	if (null == mDecor) {
        	installDecor();
        }
        return mDecor;
    }
    
到了这事件会继续分发,到我们通过setContentView设置的ViewGroup那里继续处理.

# 3.ViewGroup对事件的分发

	// Check for interception.
           	final boolean intercepted;
            if (actionMasked == MotionEvent.ACTION_DOWN
                    || mFirstTouchTarget != null) {
                final boolean disallowIntercept = (mGroupFlags & FLAG_DISALLOW_INTERCEPT) != 0;
                if (!disallowIntercept) {
                    intercepted = onInterceptTouchEvent(ev);
                    ev.setAction(action); // restore action in case it was changed
                } else {
                    intercepted = false;
                }
            } else {
                // There are no touch targets and this action is not an initial down
                // so this view group continues to intercept touches.
                intercepted = true;
            }

这段代码是来判断是否要来拦截当前的点击事件的.可以看出当这个事件是一个事件序列的开端,也就是一个ACTION_DOWN,就用去调用onInterceptTouch方法去判断是否要去拦截这个事件;或者当mFirstTouchTarget不为空的时候,也会去判断.相反,就不会拦截了.这也说明了一个事件如果View不去处理他的ACTION_DWON事件为什么就能在去处理其他的事件了.

当ViewGroup不处理事件要继续分发的时候代码是这样的:

	final int childrenCount = mChildrenCount;
	if (newTouchTarget == null && childrenCount != 0) {
    final float x = ev.getX(actionIndex);
    final float y = ev.getY(actionIndex);
    // Find a child that can receive the event.
    // Scan children from front to back.
    final ArrayList<View> preorderedList = buildOrderedChildList();
    final boolean customOrder = preorderedList == null
    && isChildrenDrawingOrderEnabled();
    final View[] children = mChildren;
    for (int i = childrenCount - 1; i >= 0; i--) {
        final int childIndex = customOrder
        ? getChildDrawingOrder(childrenCount, i) : i;
        final View child = (preorderedList == null)
        ? children[childIndex] : preorderedList.get(childIndex);

     // If there is a view that has accessibility focus we want it
     // to get the event first and if not handled we will perform a
     // normal dispatch. We may do a double iteration but this is
     // safer given the timeframe.
        if (childWithAccessibilityFocus != null) {
            if (childWithAccessibilityFocus != child) {
                continue;
            }
            childWithAccessibilityFocus = null;
            i = childrenCount - 1;
        }

        if (!canViewReceivePointerEvents(child)
            || !isTransformedTouchPointInView(x, y, child, null)) {
            ev.setTargetAccessibilityFocus(false);
        continue;
    }

    newTouchTarget = getTouchTarget(child);
    if (newTouchTarget != null) {
    // Child is already receiving touch within its bounds.
    // Give it the new pointer in addition to the ones it is handling.
        newTouchTarget.pointerIdBits |= idBitsToAssign;
        break;
    }

    resetCancelNextUpFlag(child);
    if (dispatchTransformedTouchEvent(ev, false, child, idBitsToAssign)) {
    // Child wants to receive touch within its bounds.
        mLastTouchDownTime = ev.getDownTime();
        if (preorderedList != null) {
    // childIndex points into presorted list, find original index
            for (int j = 0; j < childrenCount; j++) {
                if (children[childIndex] == mChildren[j]) {
                    mLastTouchDownIndex = j;
                    break;
                }
            }
        } else {
            mLastTouchDownIndex = childIndex;
        }
        mLastTouchDownX = ev.getX();
        mLastTouchDownY = ev.getY();
        newTouchTarget = addTouchTarget(child, idBitsToAssign);
        alreadyDispatchedToNewTouchTarget = true;
        break;
    }

    // The accessibility focus didn't handle the event, so clear
    // the flag and do a normal dispatch to all children.
    ev.setTargetAccessibilityFocus(false);
	}
	if (preorderedList != null) preorderedList.clear();
	}

逻辑也比清晰,遍历ViewGroup的所有子View,找出能接受事件的所有元素;要满足两个条件:1.坐标是否落在子View中2.是否正在播放动画.满足这两个条件,就会分发给他来处理,要是返回了true就表示事件已经被处理,mFirstTouchTarget就会被赋值并终止此次分发,否则继续分发过程.

# 4.View对点击事件的处理过程

	//View#dispatchTouchEvent
    if (onFilterTouchEventForSecurity(event)) {
    //noinspection SimplifiableIfStatement
        ListenerInfo li = mListenerInfo;
        if (li != null && li.mOnTouchListener != null
                && (mViewFlags & ENABLED_MASK) == ENABLED
                && li.mOnTouchListener.onTouch(this, event)) {
            result = true;
        }

        if (!result && onTouchEvent(event)) {
            result = true;
        }
    }
    
这里相对比较简单,首先判断是否设置了onTouchListener,如果设置了就去调用onTouch方法,如果返回了false,则去调用onTouchEvent方法;
***在view设置了onClickListener或者onLongClickListener后,会自动将CLICKABLE或者LONG_CLICKABLE变成ture;***


