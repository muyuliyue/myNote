

# 1.Lambda表达式

基本格式
（参数列表）->{代码}

函数式编程关注的是参数列表和方法体

## 省略规则 

###### ALT+回车自动转化

参数类型可以省略
方法体只有一句代码时打括号return可以省略



## 训练1

```java
package com.mona.LLambda;

import java.util.function.IntBinaryOperator;

public class LambdaDemo01 {

    public static void main(String[] args) {

      // 匿名内部类写法
        int res = calculateNum(new IntBinaryOperator() {
            @Override
            public int applyAsInt(int left, int right) {
                return left + right;
            }
        });
        System.out.println(res);


      // lambda写法1
        int res2=calculateNum((int left, int right)->{return left*right;});
      // lambda写法2（最简洁）
        int res3=calculateNum((int left, int right)-> left*right);
        System.out.println(res2);
        System.out.println(res3);
    }


    public static int calculateNum(IntBinaryOperator operator) {
        int a=10;
        int b=20;
        return operator.applyAsInt(a,b);
    }
}
```



## 训练2

```java
package com.mona.LLambda;

import java.util.function.IntBinaryOperator;
import java.util.function.IntPredicate;

public class LambdaDemo01 {

    public static void main(String[] args) {

        // 匿名内部类写法
        printNum(new IntPredicate() {
            @Override
            public boolean test(int value) {
                if (value >2){
                    return true;
                }
                return false;
            }
        });

        // lambda写法
        printNum(value -> {
            if (value >2){
                return true;
            }
            return false;
        });
    }


    public static void printNum(IntPredicate predicate) {
        int[] arr={1,2,3,4,5};
        for (int i: arr) {
            if (predicate.test(i)){
                System.out.println(i);
            }
        }
    }
}
```



## 训练3

```java
package com.mona.LLambda;

import java.util.function.Function;
import java.util.function.IntBinaryOperator;
import java.util.function.IntPredicate;

public class LambdaDemo01 {

    public static void main(String[] args) {

        // 匿名内部类写法
        Integer res = typeConvert(new Function<String, Integer>() {
            @Override
            public Integer apply(String s) {
               return Integer.valueOf(s);
            }
        });
        System.out.println(res);

       // lambda写法1
        Integer res1 = typeConvert(s -> Integer.valueOf(s));

        Integer res2 = typeConvert(Integer::valueOf);

    }


    public static <R> R typeConvert(Function<String, R> function){
        String str="1234";
        R result = function.apply(str);
        return result;

    }
}
```



# 2.Stream流

可以更方便对集合和数组操作

数据源

数据处理

收集结果



