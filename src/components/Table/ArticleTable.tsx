import { Input, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../main";
import { Users, stringTrim } from "../../helpers";
import { toast } from "react-toastify";


const ArticleTable = () => {
    const [posts, setPost] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchItem, setSearchItem] = useState('');
    const [searchData, setSearchData] = useState([]);

    const navigate = useNavigate();
    const resolveUserName = (postId: number, data: any): any => {
        const post = data.find((p: any) => p.id === postId);
        const user = Users.find((u) => u.id === post?.userId);
        return user || "Unknown";
    };

    const getArticles = async () => {
        try {
            const data = await api.get("/posts");
            const updatedData = data?.data.map((item: any) => {
                return {
                    ...item,
                    user: resolveUserName(item.id, data?.data),
                }
            })
            setPost(updatedData);
            setLoading(false);
        } catch (error: any) {
            toast.error(error)
            setLoading(false);
        }
    };

    useEffect(() => {
        getArticles();
    }, []);

    const handleSearch = async (term: any) => {
        setLoading(true)
        setSearchItem(term.trim());
        if (term) {
            const newList = posts?.filter((data: any) => {
                const searchData = Object.values(data).join(' ').toLowerCase();
                const userSearchData = Object.values(data.user).join(' ').toLowerCase();

                return searchData.includes(term.toLowerCase()) || userSearchData.includes(term.toLowerCase());
            });
            setSearchData(newList);
        } else {
            setSearchData(posts);
        }
        setLoading(false)
    };

    const { Search } = Input;

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text: any, render: any) => (
                <div>
                    {stringTrim(render?.title)}
                </div>
            ),
        },
        {
            title: 'Body',
            dataIndex: 'body',
            key: 'body',
            render: (text: any, render: any) => (
                <div>
                    {stringTrim(render?.body)}
                </div>
            ),
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
            render: (text: any, render: any) => (
                <div>
                    {render?.user?.name}
                </div>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text: any, render: any) => (
                <div>
                    <button className="text-lime-600 font-semibold" onClick={() => navigate(`/posts/${render?.id}`)}>View</button>
                </div>
            ),
        },
    ];

    return <>
        <div className="flex flex-col md:flex-row md:justify-between md:items-end w-full mt-4 py-4 px-8 z-50">
            <div className="font-bold text-xl md:text-3xl text-dark">Latest Articles</div>
            <div className="flex items-center mt-3 md:mt-0">
                <Search placeholder="input search text" className="mr-5 md:mr-10" allowClear onSearch={handleSearch} style={{ width: 200 }} />
                <button className="text-white bg-green-500 rounded px-3 py-1" onClick={() => navigate("/new-post")}>Create Article</button>
            </div>
        </div>
        <div className="my-8 mx-6">
            {loading ? (
                <Spin tip="Loading" className="mt-10">
                    <div className="content" />
                </Spin>
            ) : (
                <Table dataSource={searchItem?.length < 1 ? posts : searchData} columns={columns} />
            )}
        </div>
    </>
}

export default ArticleTable