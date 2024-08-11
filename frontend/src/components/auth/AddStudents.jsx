import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  Modal,
  InputNumber,
  message
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addUser, fetchUser, deleteUser, editUser } from "../redux/authReducer";
export default function AddStudents() {
  const [dataSource, setDataSource] = useState([]);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  message.config({
    duration: 2,
  });
  const handleCancelEdit = () => {
    setOpenEdit(false);
  };
  const showModalEdit = (record) => {
    setContent(record);
    setOpenEdit(true);
  };
  const handleDelete = async (key) => {
    await dispatch(deleteUser(key._id));
    const data = await dispatch(fetchUser());
    if (data.success) {
      setDataSource(data.users);
      message.success("Data deleted successfully")
    }
    
  };

  const defaultColumns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Salary",
      key: "Salary",
      dataIndex: "salary",
    },
    {
      title: "Delete",
      dataIndex: "Delete",

      render: (_, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record)}
        >
          <DeleteOutlined />
        </Popconfirm>
      ),
    },
    {
      title: "Edit",
      dataIndex: "Edit",
      render: (_, record) => (
        <EditOutlined onClick={() => showModalEdit(record)} />
      ),
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

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleSubmit = async (e) => {
    let values;
    e.preventDefault();
    try {
      values = await form.validateFields();
    } catch (errorInfo) {
      setOpen(false);
      message.error(errorInfo);
      return;
    }
    await dispatch(addUser(values));
    const data = await dispatch(fetchUser());
    if (data.success) {
      setDataSource(data.users);
      message.success("Data added successfuly")
    }
    else message.error(data.error);
    setOpen(false);
  };
  
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    let values;
    try {
      values = await form.validateFields();
    } catch (errorInfo) {
      setOpenEdit(false);
      message.error(errorInfo);
      return;
    }
    const id = content ? content._id : 0;
   const res = await dispatch(editUser({ id, values }));
   if(res.error){
    message.error(res.error)
   }
   else {
    message.success("Data edited successfully");
   }
    setOpenEdit(false);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await dispatch(fetchUser());
      if (res.success) {
        setDataSource(res.users);
      } else {
        message.error(res.error);
      }
    };
    fetch();
  }, []);

  const CustomizedForm = ({ onChange, fields }) => (
    <Form
      name="global_state"
      {...layout}
      fields={fields}
      onFieldsChange={(_, allFields) => {
        onChange(allFields);
      }}
      form={form}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>
      <Form.Item label="Salary" name="salary">
        <InputNumber />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" onClick={handleSubmitEdit}>
          Close
        </Button>
      </Form.Item>
    </Form>
  );
  const [fields, setFields] = useState([
    {
      name: ["name"],
      value: "",
    },
    {
      email: ["email"],
      value: "",
    },
    {
      salary: ["salary"],
      value: 0,
    },
  ]);
  useEffect(() => {
    setFields([
      { name: ["name"], value: content ? content.name : "" },
      { name: ["email"], value: content ? content.email : "" },
      { name: ["salary"], value: content ? content.salary : 0 },
    ]);
  }, [content]);
  return (
    <div className="flex items-center flex-col">
      <Button type="primary" onClick={showModal} className="mb-10 mt-10">
        Add Employee
      </Button>
      <Modal
        className="right-0"
        open={open}
        title="Add Employee"
        onCancel={handleCancel}
        onOk={handleOk}
        footer={[]}
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
            <Input />
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
            <Input />
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
            <InputNumber />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="primary" onClick={handleSubmit}>
              Close
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        className="right-0"
        open={openEdit}
        title="Edit Employee"
        onCancel={handleCancelEdit}
        footer={[]}
      >
        <CustomizedForm
          fields={fields}
          onChange={(newFields) => {
            setFields(newFields);
          }}
        />
      </Modal>
      <Table
        rowClassName={() => "editable-row"}
        bordered
        className="w-2/3"
        dataSource={dataSource}
        columns={defaultColumns}
      />
    </div>
  );
}
