



SVN是**集中式的版本控制**系统，版本库是集中放在中央服务器上。

GIT是**分布式的版本控制**系统，没有中央服务器，每个人的电脑就是一个完整的版本库。



# 1.Git环境配置

**查看配置文件**
git config -l

**查看用户名和密码**
git config --global --listgit 



# 2.Git基本理论

## 2-1 四个工作区

### 工作目录（Working Directory）

平时存放代码的地方

### 暂存区（Stage/Index）

暂存区，用于临时存放你的改动，事实上它只是一个文件，保存即将提交到文件列表信息

### 资源库（Repository）

本地仓库，安全存放数据的地方。其中HEAD指向最新放入仓库的版本

### 远程Git仓库（Remote Directory）

远程仓库，代码托管的服务器

![Git的四个工作区域和工作流程- 知乎](https://pic2.zhimg.com/v2-948b88649b9f68bffe8cdf0daefc0401_b.jpg)



# 3 GIT基本操作

**git init 初始化仓库**

**git clone [url] 克隆远程仓库**



生成SSH

# 4 IDEA集成GIT

查看分支
git branch

查看远程分支
git branch -r

新建分支
git branch [branch-name]

新建分支的同时切换到新的分支
git checkout -b  [branch-name]

**合并指定分支到当前分支**
git merge [branch]

# 步骤

```
git push origin master
```







在 Angular + TypeScript 中实现类似 Excel 的键盘导航和多选单元格功能，可以通过以下步骤实现。这里以 Angular Material 的 `<table mat-table>` 组件为基础，结合自定义键盘事件和状态管理。



\---



\### **1. 环境准备**

确保已安装 Angular Material：

\```bash

ng add @angular/material

\```



\---



\### **2. 组件实现**



\#### **(1) 定义组件和模板**

\```typescript

import { Component, HostListener, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';



interface RowData {

 id: number;

 name: string;

 age: number;

}



@Component({

 selector: 'app-excel-table',

 template: `

    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

   <!-- 列定义 -->

   <ng-container *ngFor="let col of columns; let colIndex = index" [matColumnDef]="col.field">

​    <th mat-header-cell *matHeaderCellDef>{{ col.header }}</th>

​    <td mat-cell *matCellDef="let row; let rowIndex = index" 

​      [style.background]="getCellStyle(rowIndex, colIndex)"

​      (click)="handleCellClick(rowIndex, colIndex, $event)">

​     {{ row[col.field] }}

​    </td>

   </ng-container>



   <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>

   <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

  </table>

 `,

 styles: [`

  table {

   width: 100%;

  }

  td {

   cursor: cell;

  }

 `]

})

export class ExcelTableComponent implements OnInit {

 // 列定义

 columns = [

  { field: 'id', header: 'ID' },

  { field: 'name', header: 'Name' },

  { field: 'age', header: 'Age' }

 ];

 displayedColumns = this.columns.map(col => col.field);



 // 数据

 dataSource = new MatTableDataSource<RowData>([

  { id: 1, name: 'Alice', age: 30 },

  { id: 2, name: 'Bob', age: 25 },

  { id: 3, name: 'Charlie', age: 35 }

 ]);



 // 当前焦点和选中状态

 currentFocus = { row: 0, col: 0 };

 selectedCells = new Set<string>();

 isShiftPressed = false;

 isCtrlPressed = false;



 ngOnInit() {}



 // 监听键盘事件

 @HostListener('window:keydown', ['$event'])

 handleKeyDown(event: KeyboardEvent) {

  switch (event.key) {

   case 'ArrowUp':

​    this.moveFocus(-1, 0);

​    break;

   case 'ArrowDown':

​    this.moveFocus(1, 0);

​    break;

   case 'ArrowLeft':

​    this.moveFocus(0, -1);

​    break;

   case 'ArrowRight':

​    this.moveFocus(0, 1);

​    break;

   case 'Shift':

​    this.isShiftPressed = true;

​    break;

   case 'Control':

​    this.isCtrlPressed = true;

​    break;

  }

 }



 @HostListener('window:keyup', ['$event'])

 handleKeyUp(event: KeyboardEvent) {

  if (event.key === 'Shift') this.isShiftPressed = false;

  if (event.key === 'Control') this.isCtrlPressed = false;

 }



 // 移动焦点

 moveFocus(rowDelta: number, colDelta: number) {

  const newRow = Math.max(0, Math.min(this.dataSource.data.length - 1, this.currentFocus.row + rowDelta));

  const newCol = Math.max(0, Math.min(this.columns.length - 1, this.currentFocus.col + colDelta));

   

  this.currentFocus = { row: newRow, col: newCol };

  this.updateSelection();

 }



 // 点击单元格

 handleCellClick(rowIndex: number, colIndex: number, event: MouseEvent) {

  this.currentFocus = { row: rowIndex, col: colIndex };

  this.updateSelection(event.shiftKey, event.ctrlKey);

 }



 // 更新选中状态

 updateSelection(isShift = this.isShiftPressed, isCtrl = this.isCtrlPressed) {

  const key = `${this.currentFocus.row}-${this.currentFocus.col}`;



  if (isShift) {

   // Shift 多选（矩形区域）

   const startRow = Math.min(this.currentFocus.row, this.lastSelectedRow);

   const endRow = Math.max(this.currentFocus.row, this.lastSelectedRow);

   const startCol = Math.min(this.currentFocus.col, this.lastSelectedCol);

   const endCol = Math.max(this.currentFocus.col, this.lastSelectedCol);



   this.selectedCells.clear();

   for (let r = startRow; r <= endRow; r++) {

​    for (let c = startCol; c <= endCol; c++) {

​     this.selectedCells.add(`${r}-${c}`);

​    }

   }

  } else if (isCtrl) {

   // Ctrl 切换选中

   if (this.selectedCells.has(key)) {

​    this.selectedCells.delete(key);

   } else {

​    this.selectedCells.add(key);

   }

  } else {

   // 单选

   this.selectedCells.clear();

   this.selectedCells.add(key);

  }



  // 记录上一次选中位置

  this.lastSelectedRow = this.currentFocus.row;

  this.lastSelectedCol = this.currentFocus.col;

 }



 // 获取单元格样式

 getCellStyle(rowIndex: number, colIndex: number): string {

  const isFocused = rowIndex === this.currentFocus.row && colIndex === this.currentFocus.col;

  const isSelected = this.selectedCells.has(`${rowIndex}-${colIndex}`);

   

  if (isFocused) return '#e3f2fd';

  if (isSelected) return '#bbdefb';

  return 'white';

 }

}

\```



\---



\### **3. 关键实现细节**

1. **键盘事件监听**：

  \- 使用 `@HostListener` 监听全局键盘事件。

  \- 方向键更新焦点位置，`Shift`/`Ctrl` 控制多选模式。



2. **焦点和选中状态管理**：

  \- `currentFocus` 跟踪当前焦点单元格。

  \- `selectedCells` 存储所有选中的单元格键（例如 `row-col`）。



3. **多选逻辑**：

  \- **Shift 多选**：选中从上次选中位置到当前焦点的矩形区域。

  \- **Ctrl 多选**：切换单个单元格的选中状态。



4. **动态样式**：

  \- 根据 `selectedCells` 和 `currentFocus` 动态设置单元格背景色。



\---



\### **4. 优化和扩展**

1. **性能优化**：

  \- 使用 `trackBy` 减少不必要的渲染。

  \- 避免在模板中频繁调用复杂方法。



2. **边缘情况处理**：

  \- 表格边界检查（例如移动到第一行时不能再向上）。

  \- 处理跨页数据（如果表格支持分页）。



3. **复制粘贴功能**：

  \- 监听 `Ctrl+C` 和 `Ctrl+V` 事件，操作剪贴板数据。



\---



\### **5. 替代方案：使用第三方库**

如果希望减少开发成本，可以选择功能更强大的表格库：



\#### **(1) ag-Grid**

\```bash

npm install ag-grid-angular ag-grid-community

\```

\- 原生支持键盘导航、多选、复制粘贴等 Excel 功能。

\- 示例配置：

 \```typescript

 import { ColDef } from 'ag-grid-community';



 columnDefs: ColDef[] = [

  { field: 'id', headerName: 'ID' },

  { field: 'name', headerName: 'Name' },

  { field: 'age', headerName: 'Age' }

 ];



 rowData = [

  { id: 1, name: 'Alice', age: 30 },

  { id: 2, name: 'Bob', age: 25 },

  { id: 3, name: 'Charlie', age: 35 }

 ];

 \```

 \```html

 <ag-grid-angular

  [rowData]="rowData"

  [columnDefs]="columnDefs"

  [enableRangeSelection]="true"

  [rowSelection]="'multiple'"

  style="width: 100%; height: 300px;"

 \>

 </ag-grid-angular>

 \```



\#### **(2) ngx-datatable**

\```bash

npm install @swimlane/ngx-datatable

\```

\- 支持多选和键盘事件，但需要自定义部分逻辑。



\---



\### **6. 最终效果**

\- 使用方向键移动焦点。

\- `Shift` + 方向键/点击选择矩形区域。

\- `Ctrl` + 点击切换选中状态。

\- 选中单元格高亮显示。



通过上述方法，可以在 Angular + TypeScript 中实现类似 Excel 的交互体验。











