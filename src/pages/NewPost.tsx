import { Button, Form, Input, Select } from "antd"
import Hero from "../components/Hero/Hero"
import { Users } from "../helpers"
import ReactQuill from "react-quill"
import { useState } from "react"
import 'react-quill/dist/quill.snow.css';
import { api } from "../main";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"

const NewPost = () => {
    const [body, setBody] = useState('')
    const { Option } = Select
    const quillWidth = `100%`;
    const navigate = useNavigate()

    const handleSubmit = async (formFields: any) => {
        try {
            await api.post('/posts', {
                userId: formFields.user,
                body,
                title: formFields.title
            })
            toast('Successfully created an article');
            navigate('/')
        } catch (error: any) {
            toast.error(error)
        }
    }

    return <>
        <Hero writeUp={'Share your knowledge about LAW'} />
        <div className="mx-[8%] md:mx-[20%] mt-20">
            <h3 className="font-extrabold text-orange-500 text-4xl text-center mb-10">Create New Article</h3>
            <Form
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input title!' }]}
                >
                    <Input size="large" />
                </Form.Item>

                <Form.Item
                    label="Author"
                    name="user"
                    rules={[{ required: true, message: 'Please select author!' }]}
                >
                    <Select
                        showSearch
                        size="large"
                        placeholder="Select author"
                        optionFilterProp="children"
                    >
                        {Users.map((data, index) => (
                            <Option key={index} value={data.id}>{data.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <div className="w-[100%]">
                    <Form.Item
                        label="Message"
                        name="body"
                        rules={[{ required: true, message: 'Please select body!' }]}
                    >
                        <ReactQuill
                            value={body}
                            modules={NewPost.modules}
                            formats={NewPost.format}
                            onChange={e =>
                                setBody(e)
                            }
                            style={{ width: quillWidth }}
                            placeholder="Type article body"
                        />
                    </Form.Item>
                </div>

                <Form.Item>
                    <Button className="bg-green-500 text-white px-20" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </>
}

NewPost.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        ['code-block'],
    ],
};

NewPost.format = [
    'header',
    'font',
    'size',
    'strike',
    'bold',
    'italic',
    'underline',
    'blockquote',
    'list',
    'bullet',
    'link',
    'code-block',
];

export { NewPost }