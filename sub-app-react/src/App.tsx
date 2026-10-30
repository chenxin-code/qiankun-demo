import { Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface DataType {
  key: string
  id: number
  name: string
  age: number
  city: string
  role: string
  status: string
}

const data: DataType[] = [
  { key: '1', id: 1, name: '张伟', age: 28, city: '北京', role: '前端开发', status: 'active' },
  { key: '2', id: 2, name: '李娜', age: 32, city: '上海', role: '后端开发', status: 'active' },
  { key: '3', id: 3, name: '王强', age: 25, city: '广州', role: '产品经理', status: 'inactive' },
  { key: '4', id: 4, name: '刘洋', age: 35, city: '深圳', role: 'UI设计师', status: 'active' },
  { key: '5', id: 5, name: '陈静', age: 29, city: '杭州', role: '前端开发', status: 'active' },
  { key: '6', id: 6, name: '杨帆', age: 31, city: '成都', role: '测试工程师', status: 'inactive' },
]

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 120,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: '城市',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Tag color={status === 'active' ? 'green' : 'default'}>
        {status === 'active' ? '在职' : '离职'}
      </Tag>
    ),
  },
]

function App() {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ color: '#61dafb', marginBottom: 8 }}>React 子应用</h2>
      <p style={{ color: '#666', marginBottom: 20 }}>
        技术栈：React 19 + Vite + TypeScript + Ant Design
      </p>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        bordered
        pagination={{ pageSize: 5 }}
      />
    </div>
  )
}

export default App
