

# 安装

#### node.js

JavaScript 诞生于 1995 年，几乎是和互联网同时出现；Node.js 诞生于 2009 年，比 JavaScript 晚了 15 年左右。

在 Node.js 之前，JavaScript 只能运行在浏览器中，作为网页脚本使用，为网页添加一些特效，或者和服务器进行通信。有了 Node.js 以后，JavaScript 就可以脱离浏览器，像其它编程语言一样直接在计算机上使用，想干什么就干什么，再也不受浏览器的限制了。

Node.js 不是一门新的编程语言，也不是一个 JavaScript 框架，它是一套 JavaScript 运行环境，用来支持 JavaScript 代码的执行。用编程术语来讲，Node.js 是一个 JavaScript 运行时（Runtime）。

##### NPM

*NPM 是什么*. npm（“Node 包管理器”）是JavaScript 运行时Node.js 的默认程序包管理器。

##### package.json

Node 项目在项目根目录中名为 *package.json* 的文件中跟踪依赖关系和元数据。这是你项目的核心。它包含名称、描述和版本之类的信息，以及运行、开发以及有选择地将项目发布到 NPM 所需的信息。

```bat
rem 在指定文件夹下生成package.json文件
npm init -y
```



##### Cypress安装

```
npm install cypress --save
```



打开Cypress

```
./node_modules/.bin/cypress open
```

好用插件

Cypress Snippets: 自动完成代码段



# Libraries

## Mocha

https://docs.cypress.io/guides/references/bundled-libraries#Mocha

## Chai

https://docs.cypress.io/guides/references/bundled-libraries#Chai



# 常用操作

##  页面导航操作

## 元素定位

### get

#### 通过CSS选择器

<div id="querying">
	<div class="well">
         <button id="query-btn" class="query-btn btn btn-primary">
                Button
          </button>
   </div>
</div>

```javascript
it('get', () => {

 cy.visit('https://example.cypress.io/commands/querying');

 // 通过CSS的id查找

 cy.get('#query-btn').should('contain', 'Button')

 // 通过CSS的class查找

 cy.get('.query-btn').should('contain', 'Button')

 // 通过CSS的 id class 元素 元素第几个 查找

 cy.get('#querying .well>button:first').should('contain', 'Button')

});
```



#### 通过自定义ID

<div class="well well-1-line">
              <div data-test-id="test-example" class="example">
                Div with <code>data-test-id</code>
              </div>
            </div>

```javascript
it('get2', () => {
  cy.visit('https://example.cypress.io/commands/querying');

  // 通过自定义id查找
  cy.get('[data-test-id="test-example"]').should('have.class', 'example')

  // invoke:对前一个命令返回的结果进行调用
  cy.get('[data-test-id="test-example"]')
    .invoke('attr', 'data-test-id')
    .should('equal', 'test-example')
});
```



#### 通过前后元素关系

<form class="query-form">
                <input type="text" id="inputEmail" class="form-control" placeholder="Email">
                <input type="text" id="inputPassword" class="form-control" placeholder="Password">
              </form>

```js
it('findElemtn', () => {

  cy.visit('https://example.cypress.io/commands/querying');

  // 通过父元素查找子元素（query-form的子元素有name，password)
  let name_el = cy.get('.query-form').children('input:first')
  name_el.type('mona');

  // 查找同级元素（name的同级元素是password)
  let password_el = name_el.siblings('input');
  password_el.type('1234');

  // 查找指定元素的前一个元素（password的后一个元素是name)
  password_el.prev('input').clear();

  // 查找指定元素的后一个元素（name的后一个元素是password)
  name_el.next('input').clear();
});
```



### select

#### 　排除disabled以外都选

<div class="action-checkboxes">
              <div class="checkbox">
                <label>
                  <input type="checkbox" value="checkbox1">
                  Checkbox one has value "checkbox1"
                </label>
              </div>
              <div class="checkbox disabled">
                <label>
                  <input type="checkbox" value="checkbox2" disabled="">
                  Checkbox two is disabled
                </label>
              </div>
              <div class="checkbox">
                <label>
                  <input type="checkbox" value="checkbox3">
                  Checkbox three has value "checkbox3"
                </label>
              </div>
            </div>



```js
it('test', () => {
  cy.visit('https://example.cypress.io/commands/actions');

  cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]')
    .check().should('be.checked')
});
```







# session

```javascript
  beforeEach(() => {
    cy.session('login', () => {
      cy.visit('https://github.com/login')
      cy.get('#login_field').type('muyuliyue@gmail.com');
      cy.get('#password').type('Wanjj1310073');
      cy.get('input[name="commit"]').click();
      cy.wait(3000);
    }, {
      validate() {
        cy.document().its('cookie').should('contain', 'name').then((token) => {
          cy.request({
            url: 'https://github.com',
            headers: {
              token
            }
          })
        })
      }
    })
  })
```



#### 理解session和cookie

源于web系统的发展和变迁。

web1.0:
强调的是资源的共享。http协议是一种无状态的协议。

web2.0
强调的是交互。交互意味着是有多步操作，请求和请求之间是有依赖存在的。
为此引用了session和cookie

#### session和cookie的特征

- session和cookie都是由服务器生成的，都是用来存储特定的值（键值对）
- session是存储在服务器的，而cookie是会返回给客户端的。
  在服务器端，session的存储方式有文件方式，数据库方式。（sessionID就是用来识别这个文件的（文件名相关），识别数据库的某一条记录（KEY）。sessionID最后会以类似于cookie的方式返回给客户端。）sessionID是服务器用来识别，操作存储session值的对象的。
- 客户端在发送请求的时候会自动将存活，可用的cookie封装在请求头中和请求一起发送。

