---
layout: post
title: 简单的括号检查程序
category: 技术
tags: java
description: 
---

>一个很简单的括号语法检查器

## ***1.实现效果***

首先我们先看一下我们实现的效果是什么样子的。
![](http://7xjtan.com1.z0.glb.clouddn.com/testHomework-1.png)
我们要实现的功能如下，
1. 检查代码中括号的使用是否合法
2. 指出括号使用出现了什么错误
3. 指出哪个括号出现了问题，在行中找出他的位置

## ***2.核心算法***

**核心算法**并不是很复杂，如下

- 遍历整个字符串序列
  - 若遇到左括号，如“（”和“{”，则将其入栈
  - 若遇到右括号，如“）”和“}”，则获取到栈顶元素s
     - 如果当前元素c与s是匹配的，则说明这里括号使用没有语法错误
     - 如果当前元素c与s不匹配，则说明这里的括号使用有语法错误，需要记录错误信息
  - 否则就不处理，直接跳过该元素
- 遍历结束后检查栈
  - 如果栈为空，则说明没有语法错误
  - 如果栈不为空，则说明有语法错误，需要记录错误信息


## ***3.思路分析***

我们首先按照算法理一下思路：
1. 我们要获取到文件里的字符信息，这里就要用到文件读写的内容；我打算包装一个**ReadFile**类，让他完成这些工作。
2. 对于这个程序我们关心的数据有括号、括号所在行号、括号所在行的内容以及括号在行里的位置；把这些数据封装成实体类**SymbolEntity**。
3. 这检查过程中我们还需要产生错误信息，这个错误信息也需要包装成类**ErrorDescription**
4. 最后就是最核心的检查功能了，我们把他封装成**CheckUtil**类；这个类实现检测功能和错误信息生成功能；

## ***4.具体实现***

>SymbolEntity.java类

	public class SymbolEntity {
		private String symbol;
		private int lineNumber;
		private String lineContent;
		private int symbolNumber;

		public SymbolEntity(String symbol, int lineNumber, String lineContent, int symbolNumber) {
			this.symbol = symbol;
			this.lineNumber = lineNumber;
			this.lineContent = lineContent;
			this.symbolNumber = symbolNumber;
		}

		public String getSymbol() {
			return symbol;
		}

		public int getLineNumber() {
			return lineNumber;
		}

		public String getLineContent() {
			return lineContent;
		}

		public int getSymbolNumber() {
			return symbolNumber;
		}
	}

>ErrorDescription.java类

	 public class ErrorDescription {
		private int errorLineNumber;
		private String errorDes;

		public ErrorDescription() {
		}

		public ErrorDescription(int errorLineNumber, String errorDes) {
			this.errorLineNumber = errorLineNumber;
			this.errorDes = errorDes;
		}

		public int getErrorLineNumber() {
			return errorLineNumber;
		}

		public String getErrorDes() {
			return errorDes;
		}

		public void setErrorLineNumber(int errorLineNumber) {
			this.errorLineNumber = errorLineNumber;
		}

		public void setErrorDes() {
			this.errorDes = errorDes;
		}
	}
    
	
>CheckUtil.java类

	import java.util.Stack;
	import java.util.*;
	import java.io.IOException;
	//要注意在代码或者注释中出现的'{','}','(',')'，也会影响我们的判断
	// {    123
	// }   125
	// (    40
	// )    41

	//故意出一个错误
	// {
	public class CheckUtil {
		private List<ErrorDescription> mErrorList = new ArrayList<>();
		private String mFileName;
		private ReadFile mReadFile;
		private Stack<SymbolEntity> mStack = new Stack();
		private boolean isOverCheck = false;

		public CheckUtil(ReadFile mReadFile) {
			this.mReadFile = mReadFile;
			mFileName = mReadFile.getFileName();
		}

		public CheckUtil(String mFileName) throws NullPointerException, Exception {
			this.mFileName = mFileName;
			mReadFile = new ReadFile(mFileName);
		}

		public boolean startCheck() throws IOException {

			String lineContent = "";
		
			while(null != (lineContent = mReadFile.next())) {
				for (int i = 0; i < lineContent.length(); i++) {
					switch(lineContent.charAt(i)) {
						case 123: 
							mStack.push(new SymbolEntity(String.valueOf((char)123), 
							mReadFile.getLineNumber(),
							lineContent,
							i+1));
							break;
						case 40:
							mStack.push(new SymbolEntity(String.valueOf((char)40), 
							mReadFile.getLineNumber(),
							lineContent,
							i+1));
							break;
						case 125:
							dealChar((char)125, (char)123, lineContent, i+1);
							break;
						case 41:
							dealChar((char)41, (char)40, lineContent, i+1);
							break;
					}
				}
			}

			while (!mStack.isEmpty()) {
				SymbolEntity entity = mStack.pop();
				switch(entity.getSymbol().charAt(0)) {
					case 123:
						buildError(entity, (char)125);
						break;
					case 40:
						buildError(entity, (char)41);
						break;
				}
			}

			isOverCheck = true;
		
			if (0 == mErrorList.size()) {
				return true;
			} else {
				return false;
			}
		}

		private void dealChar(char currentChar, char oppositeSymbol, String lineContent, int symbolNumber) {

			if (!mStack.isEmpty()) {
				SymbolEntity entity = mStack.peek();
				if (entity.getSymbol().charAt(0) != oppositeSymbol) {
					buildError(new SymbolEntity(String.valueOf(currentChar), 
					mReadFile.getLineNumber(), lineContent, symbolNumber), oppositeSymbol);		
				} else {
					mStack.pop();
				}	
			} else {
				buildError(new SymbolEntity(String.valueOf(currentChar), 
					mReadFile.getLineNumber(), lineContent, symbolNumber), oppositeSymbol);	
			}
		}

		private void buildError(SymbolEntity entity, char missSymbol) {
			//在什么什么文件里，第多少多少行的什么没有什么与之配对
			String result = "在" + mFileName + "中," + "第" + (entity.getLineNumber()+1) +
				"行的\"" + entity.getSymbol() + "\"没有\"" + missSymbol + "\"与之配对\n"
				+ entity.getLineContent() + "\n";

			for (int i = 1; i < entity.getSymbolNumber(); i++) {
				result += " ";
			}

			result += "^";

			mErrorList.add(new ErrorDescription(
					entity.getLineNumber(),
					result)
			);
		}	
	
		public boolean isChecked() {
			return isOverCheck;
		}

		public List<ErrorDescription> getErrorList() {
			if (isOverCheck) {
				return mErrorList;
			} else {
				return null;
			}
		}
	}

>ReadFile.java类

	import java.io.*;

	public class ReadFile {
		//{
		private String mFileName;			// file path
		private int mCurrentLine = 0;			// current line number
		private BufferedReader mBufferReader;	// read file class

		public ReadFile() {
		}

		public ReadFile(String mFileName) throws NullPointerException,Exception {
			if (null == mFileName) {
				throw new NullPointerException("file name is not allowed to be null");
			}

			if (!(new File(mFileName).isFile())) {
				throw new Exception("this filename is not a file");
			}

			this.mFileName = mFileName;

			mBufferReader = new BufferedReader(new 
			FileReader(mFileName));
		}

		public String next() throws IOException {
			mCurrentLine++;
			return mBufferReader.readLine();
		}

		public int getLineNumber() {
			return mCurrentLine;
		}

		public String getFileName() {
			return mFileName;
		}
	}


>Main.java类 该类就是来测试其他类

	import java.util.*;
	import java.io.*;
	import java.util.regex.*;

	public class Main{
		public static void main(String[] args) {
		
			File file = file = new File(".");
			final String regex = ".java";
			String[] list = file.list(new FilenameFilter() {
				@Override
				public boolean accept(File file, String name) {
					return name.contains(regex);
				}
			});
	
			Arrays.sort(list, String.CASE_INSENSITIVE_ORDER);
			String s = "";
			List<ErrorDescription> lists = new ArrayList<>();
			for (String name : list) {
				try {	
					//System.out.println(name);
					ReadFile r = new ReadFile(name);
					CheckUtil c = new CheckUtil(r);
					if (c.startCheck()) {
						System.out.println(name +":没有错误");
					} else {
						lists.addAll(c.getErrorList());
					}
				} catch(Exception e) {
					System.out.println("出现未捕获的异常，信息如下：");
					e.printStackTrace();
					System.exit(-1);
				}
			}
			for (ErrorDescription e : lists) {
				System.out.println(e.getErrorDes());
			}
		}
	}






