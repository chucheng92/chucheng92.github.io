---
layout: post
title: View滑动冲突的解决方案
category: 技术
tags: android
description: View冲突解决方案
---

>当View的滑动存在冲突的时候怎么解决?

# 1.冲突的常见场景

1. 外部滑动与内部滑动方向不一致
2. 外部滑动和内部滑动方向一致
3. (1)和(2)场景的嵌套出现

例如我们在Viewpage里面嵌套使用了ListView,这样Viewpage是可以左右滑动的,但是listview同时还可以上下滑动,这样就会出现第一情况这种的滑动冲突.但是我们可能在使用并没有出现什么问题,这是因为Viewpage在内部已经解决了这个问题,所以我们可以正常的使用.要是我们在开发中也遇到类似问题怎么解决呢?其实解决的这个问题的方法是比较固定的,说难不难,说简单也简单.这就是所谓的会的不难,难的不会吧.

# 2.解决冲突的办法

解决思路是这样的:在分发事件的过程中根据事件的特征就确定出事件到底应该交给谁来处理,这样就不会有冲突了.根据控制事件的分发的途径,可以有一下两个方法:

1.外部拦截法

	public boolean onInterceptTouchEvent(MotionEvent e) {
        boolean intercepted = false;
        int x = (int) e.getX();
        int y = (int) e.getY();
        switch (e.getAction()) {
        	case MotionEvent.ACTION_DOWN:
            	intercepted = false;
            	break;
            case MotionEvent.ACTION_MOVE: 
            	if (需要拦截该事件的逻辑) {
                	intercepter = true;
                } else {
                	intercepted = false;
                }
            	break;
            case MotionEvent.ACTION_UP:
            	intercepted = false;
            	break;
            default:
            	break;
        }
        mLastXIntercept = x;
        mLastYIntercept = y;
        return intercepted;
    }

这段代码是相对固定的,只需要修改拦截的逻辑就好了.有几点需要说明一下:
***ACTION_DWON这个事件必须返回false,不然的话事件将无法继续分发给子View处理了;ACTION_UP事件也要返回false,不然子View的onClick事件就无法执行了;但是ACTION_MOVE就可以由我们自由控制决定是否要进行拦截了.***


2.内部拦截的方法
这种方法是将所有的事件都交给内部View去决定这个事件是自己处理还是交还给外部View处理.

	public boolean dispatchTouchEvent(MotionEvent e) {
    	int x = (int) e.getX();
        int y = (int) e.getY();
        swtich(e.getAction()) {
			case MotionEvent.ACTION_DOWN:
            	parent.requestDisallowInterceptTouchEvent(true);
            	break;
            case MotionEvent.ACTION_MOVE:
            	int detalX = x - mLastX;
                int deltaY = y - mLastY;
                if (父容器需要拦截事件) {
                	parent.requestDisallowInterceptTouchEvent(false);
                }
            	break;
            case MotionEvent.ACTION_UP:
            	break;
            default:
            	break;
        }
        mLastX = x;
        mLastY = y;
        return super.dispatchTouchEvent(e);
    }
    
>public void requestDisallowInterceptTouchEvent (boolean disallowIntercept)
>Called when a child does not want this parent and its ancestors to intercept touch events with onInterceptTouchEvent(MotionEvent).
>This parent should pass this call onto its parents. This parent must obey this request for the duration of the touch (that is, only clear the flag after this parent has received an up or a cancel.
>Parameters  --  disallowIntercept	True if the child does not want the parent to intercept touch events.

还要重写外部View的onInterceptTouchEvent:

	public boolean onInterceptTouchEvent(MotionEvent e) {
    	int action = e.getAction();
        if (MotionEvent.ACTION_DOWN == action) {
        	return false;
        } eles {
        	return true;
        }
    }
    
这里,我们把所有的事件都去交给内部View去分发处理.

大体解决办法就这两种,这里(1)(2)(3)解决办法其实根本是一样的,只是(2)(3)仅仅通过手势是无法解决的,必须根据我们自己程序的逻辑来确定这个问题.
