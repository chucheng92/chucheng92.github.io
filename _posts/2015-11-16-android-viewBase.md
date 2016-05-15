---
layout: post
title: 有关View的基础知识介绍
category: 技术
tags: android
description: 关于View的基础知识介绍

---

>今天开始学习一下android有关View的知识

# 1.什么是View

在开发过程中,view的使用频率是非常之高的.那么View到底是什么呢.***View其实是android中所有控件的基类.***无论是简单的button,复杂的listview,还是布局容器linearlayout等等;所以,这个View就是界面层控件的一层抽象.除了View,还有一个ViewGroup类,他也是继承自View,但是从名字上就可以看出,它是一个View组,可以包含多个View.如此设计,便可以得到一个树形结构.
![view结构](http://my.csdn.net/uploads/201208/01/1343827041_4739.png)

# 2.View的位置参数

View的位置是由四个顶点决定的,分别对应top,left,right和bottom.需要注意的是这些数值都是相对于*** 父控件 ***来说的.
	
    //一般要获取View的大小可以这样
    viewWidth = view.getRight() - view.getLeft();
    viewHeight = view.getBottom - view.getTop();
    
到了android3.0的时候,google又增加了额外的几个参数:x,y,translationX和translationY.
x,y表示的是左上角点的坐标.translationX和translationY的默认值都是0.

	x = left + translationX;
    y = right + translationY;
    
***需要强调的是:在View平移的过程中,top和left表示的是原始的左上角的位置信息,是不会发生改变的.发生改变的是x,y,translationX和translationY.***

# 3.MotionEvent和TouchSlop

1.MotionEvent-手势事件
主要包括一下几个类型:
ACTION_DOWN:手指刚刚接触屏幕
ACTION_UP:手指松开的一瞬间
ACTION_MOVE:手指在屏幕上移动
对于这些事件发生的位置可以提供以下几个方法获取位置:

	//相对于所在view的x,y坐标
    x = motionEvent.getX();
    y = motionEvent.getY();
    //相对于屏幕所在位置
    rawX = motionEvent.getRawX();
    rawY = motionEvent.getRawY();
    
2.TouchSlop
它是一个常量,是系统所能识别的滑动的最小距离.换句话说,如果你移动的距离小雨这个常量,系统就不会认为你这是一次滑动事件.
	
    //可以通过一下方法获取这个常量 系统版本不一样 数值不一样的
    ViewConfiguration.get(getContext()).getScaledTouchSlop();
    
# 3.VelocityTracker,GestureDetector和Scroller

1.VelocityTracker
主要是用来追踪手指的移动速度,包括水平速度和垂直速度.
使用方法:在View的onTouchEvent()中追踪速度
	
    VelocityTracker tracker = VelocityTracker.obtain();
    tracker.addMovement(tracker);
    
获取速度的时候这样做:

	//设置计算速度的时段的大小 单位是ms
    //这一步必须在下面方法的前面 不然报错哟
	tracker.computerCurrentVelocity(1000);
    //速度单位是 px/ms
    //速度值可能是负的
    int velocityX = (int) tracker.getXVelocity();
    int velocityY = (int) tracker.getYVelocity();
    
实际上速度是这样计算的

	速度 = (结束位置 - 开始位置) / 时间;

在不需要的时要clear掉VelocityTracker

	tracker.clear();
	tracker.recycle();

2.GestureDetector-手势检测
用于辅助检测用户的单击,滑动,长按,双击等等行为.
首先,创建一个GestureDetector对象并实现onGestureListener()接口,根据需要还可以onDoubleTapListener()实现双击事件.
	
    GestureDetector detector = new GestureDetector(this, new GestureDetector.OnGestureListener() {
            @Override
            public boolean onDown(MotionEvent e) {
                //手指触摸屏幕的瞬间 一个ACTION_DOWN发生
                return false;
            }

            @Override
            public void onShowPress(MotionEvent e) {
				//手指触摸屏幕 尚未松开 强调的是没有松开或者拖动的事件
                //有一个ACTION_DOWN触发
            }

            @Override
            public boolean onSingleTapUp(MotionEvent e) {
                //手指触摸后松开 有一个ACTION_UP发生
                //是单击行为
                return false;
            }

            @Override
            public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX, float distanceY) {
                //手指按下屏幕并且拖动
                //由一个ACTION_DOWN和多个ACTION_UP触发 是拖动行为
                return false;
            }

            @Override
            public void onLongPress(MotionEvent e) {
				//用户长时间按住屏幕不放 这是长按事件
            }

            @Override
            public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX, float velocityY) {
            //按下屏幕 快速滑动 然后又松开
            //由一个ACTION_DOWN,多个ACTION_MOVE和一个ACTION_UP触发
            //这是快速滑动行为
                return false;
            }
        });
              detector.setOnDoubleTapListener(new GestureDetector.OnDoubleTapListener() {
            @Override
            public boolean onSingleTapConfirmed(MotionEvent e) {
            //这是严格的单击行为
            //若是触发了onSingleTapConfirmed(),则不可能后面还发生单击,这也就是保证了这就单击 不可能是双击中的一次单击
                return false;
            }

            @Override
            public boolean onDoubleTap(MotionEvent e) {
            //双击 由两次单击事件发生
                return false;
            }

            @Override
            public boolean onDoubleTapEvent(MotionEvent e) {
            //双击事件发生期间会随着ACTION_DOWN,ACTION_UP,ACTON_MOVE多次调用
                return false;
            }
        });

接着,接管目标View的onTouchEvent方法,在待监听View的onTouchEvent()方法中添加如下实现:
	
    return decevtor.onTouchEvent(event);
    
# 3.Scroll
弹性滑动对象,用于实现控件的弹性滑动.当使用View的scrollTo/scrollBy方法来进行滑动.`scrollTo`是绝对滑动,`scrollBy`是相对当前位置的滑动.






