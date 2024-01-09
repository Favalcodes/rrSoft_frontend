import { useEffect, useState } from "react";
import Hero from "../components/Hero/Hero"
import { useParams } from "react-router-dom";
import { api } from "../main";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { Users, stringTrim } from "../helpers";

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    user: {
      id: number;
      name: string;
      contact: string;
    };
  }

const Article = () => {
    const [post, setPost] = useState<Post | null>(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    const getArticle = async () => {
        try {
            const { data } = await api.get(`/posts/${id}`);
            data.user = Users.find((u) => u.id === data?.userId)
            setPost(data);
            setLoading(false);
        } catch (error: any) {
            toast.error(error)
            setLoading(false);
        }
    };

    useEffect(() => {
        getArticle();
    }, []);

    return <>

        {loading ? (
            <div className="flex justify-center items-center mt-[40%]">
                <Spin tip="Loading">
                    <div className="content" />
                </Spin>
            </div>
        ) : (
            <div>
                <Hero writeUp={stringTrim(post?.title)} />
                <div className="my-10 mx-[8%] md:mx-[20%]">
                    <h3 className="font-semibold text-orange-400 text-xl md:text-3xl mb-5">{post?.title}</h3>
                    <p className="font-light text-base">{post?.body}</p>
                    <div className="flex justify-end items-center mt-8">
                        <div>
                            <h6 className="font-semibold">Author: {post?.user?.name}</h6>
                            <p className="font-light">Contact: {post?.user?.contact}</p>
                        </div>
                    </div>
                </div>
            </div>
        )}

    </>
}

export { Article }