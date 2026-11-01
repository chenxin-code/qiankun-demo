import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

export interface UserData {
  id: number;
  name: string;
  age: number;
  city: string;
  department: string;
  position: string;
  status: 'active' | 'inactive';
}

const USER_DATA: UserData[] = [
  { id: 1, name: '张伟', age: 28, city: '北京', department: '技术部', position: '前端开发', status: 'active' },
  { id: 2, name: '李娜', age: 32, city: '上海', department: '技术部', position: '后端开发', status: 'active' },
  { id: 3, name: '王强', age: 25, city: '广州', department: '产品部', position: '产品经理', status: 'inactive' },
  { id: 4, name: '刘洋', age: 35, city: '深圳', department: '设计部', position: 'UI设计师', status: 'active' },
  { id: 5, name: '陈静', age: 29, city: '杭州', department: '技术部', position: '全栈开发', status: 'active' },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `
    <div class="container">
      <h2>Angular 子应用</h2>
      <p class="tech-stack">技术栈：Angular 17 + Angular Material + TypeScript</p>
      
      <div class="table-card">
        <table mat-table [dataSource]="dataSource" class="user-table">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let element">{{element.id}}</td>
          </ng-container>

          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>姓名</th>
            <td mat-cell *matCellDef="let element" class="name-cell">{{element.name}}</td>
          </ng-container>

          <ng-container matColumnDef="age">
            <th mat-header-cell *matHeaderCellDef>年龄</th>
            <td mat-cell *matCellDef="let element">{{element.age}}</td>
          </ng-container>

          <ng-container matColumnDef="city">
            <th mat-header-cell *matHeaderCellDef>城市</th>
            <td mat-cell *matCellDef="let element">{{element.city}}</td>
          </ng-container>

          <ng-container matColumnDef="department">
            <th mat-header-cell *matHeaderCellDef>部门</th>
            <td mat-cell *matCellDef="let element">{{element.department}}</td>
          </ng-container>

          <ng-container matColumnDef="position">
            <th mat-header-cell *matHeaderCellDef>职位</th>
            <td mat-cell *matCellDef="let element">{{element.position}}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>状态</th>
            <td mat-cell *matCellDef="let element">
              <span class="status-tag" [class.active]="element.status === 'active'" [class.inactive]="element.status === 'inactive'">
                {{element.status === 'active' ? '在职' : '离职'}}
              </span>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h2 {
      color: #303133;
      margin-bottom: 8px;
      font-size: 24px;
      font-weight: 600;
    }
    
    .tech-stack {
      color: #909399;
      margin-bottom: 24px;
      font-size: 14px;
    }
    
    .table-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    
    .user-table {
      width: 100%;
    }
    
    .user-table th {
      background: #f5f7fa;
      color: #606266;
      font-weight: 600;
      font-size: 14px;
      padding: 12px 0;
      border-bottom: 2px solid #ebeef5;
    }
    
    .user-table td {
      padding: 16px 0;
      border-bottom: 1px solid #ebeef5;
      color: #303133;
      font-size: 14px;
    }
    
    .user-table tr:last-child td {
      border-bottom: none;
    }
    
    .user-table tr:hover td {
      background: #f5f7fa;
      transition: background 0.2s ease;
    }
    
    .user-table td:first-child,
    .user-table th:first-child {
      padding-left: 16px;
    }
    
    .user-table .name-cell {
      font-weight: 500;
    }
    
    .status-tag {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }
    
    .status-tag.active {
      background: #f0f9eb;
      color: #67c23a;
    }
    
    .status-tag.inactive {
      background: #f4f4f5;
      color: #909399;
    }
  `]
})
export class AppComponent {
  displayedColumns: string[] = ['id', 'name', 'age', 'city', 'department', 'position', 'status'];
  dataSource = USER_DATA;
}
