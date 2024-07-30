import  {  useEffect, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table,Modal, InputNumber  } from 'antd';
import {
  DeleteOutlined
  
} from '@ant-design/icons';
import { message } from 'antd';
import { useDispatch } from "react-redux";
import { addUser, fetchUser, deleteUser} from "../redux/authReducer";
export default function AddStudents  ()  {
  
  const [dataSource, setDataSource] = useState([]);
  const [visibleLogin, setvisibleLogin] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleDelete = async(key) => {
    await dispatch( deleteUser(key._id));
  };
  const defaultColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
      key:'name',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key:'email',
      editable: true,
    },
    {
      title: 'Salary',
      key:'Salary',
      dataIndex: 'salary',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
           <DeleteOutlined />
          </Popconfirm>
        ) : null,
    },
  ];
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const [error,setError] = useState(null);
  const [form] = Form.useForm();
  const err = () => {
    message.error('This is an error message');
  };

  const dispatch = useDispatch();
  
  const handleSubmit = async (e) => {
    let values;
    e.preventDefault();
    try {
      values = await form.validateFields();
    } catch (errorInfo) {
      return;
    }
    const res = await dispatch( addUser(values));
    if(res.success)setvisibleLogin(1);
    else{
      setvisibleLogin(2);
       setError(res.error)
      }
      
  };

  useEffect(()=>{
    const fetch = async()=>{
      const res = await dispatch(fetchUser());
      if(res.success){
       setDataSource(res.users);
      }
      else{
        message.error(res.error);
      }
    }
    fetch();
  },[])
  return (
    <div className='flex items-center flex-col' >
      <Button type="primary" onClick={showModal} className='mb-10 mt-10'>
      Add Student
      </Button>
      <Modal
        className="right-0"
        open={open}
        title="Add Student"
        onOk={handleOk}
        onCancel={handleCancel}  
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
  <Form
    {...layout}
    form={form}
    name="nest-messages"
    style={{
      maxWidth: 600,
    }}
  >
    <Form.Item
      label="Name"
      name="name"
      required
      tooltip="This is a required field"
      rules={[
        {
          required: true,
          message: "Name is a required field!",
        },
      ]}
    >
      <Input/>
    </Form.Item>
    <Form.Item
    label="Email"
    name="email"
    required
    tooltip="This is a required field"
    rules={[
      {
        required: true,
        message: "email is a required field!",
      },
    ]}
    >
      <Input  />
    </Form.Item>
    <Form.Item
    label="Salary"
    name="salary"
      required
      tooltip="This is a required field"
      rules={[
        {
          required: true,
          message: "Salary is a required field!",
        },
      ]}
    >
      <InputNumber/>
    </Form.Item>
    <Form.Item
      wrapperCol={{
        ...layout.wrapperCol,
        offset: 8,
      }}
    >
      <Button type="primary" onClick={handleSubmit} >
        Submit
      </Button>
    </Form.Item>
  </Form>

      </Modal>

      <Table
        rowClassName={() => 'editable-row'}
        bordered
        className='w-2/3'
        dataSource={dataSource}
        columns={defaultColumns}
      />
    </div>
  );
};
