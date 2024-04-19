import React, { useState } from "react";
import { useSelector } from 'react-redux';
import Sugesstions from "./Sugesstions";
import "./PageMain.css";
import Post from "./posts/Post"
import { getHipstagramPost, useGetHipstagramPostQuery, useGetHipstagramFindQuery, useGetPostOneQuery } from "../app/_store"
import InfiniteScroll from "react-infinite-scroll-component";


function PageMain() {

    const { data: response, error, isLoading } = useGetPostOneQuery(); 


    const user = useSelector(state => state.auth.userInfo);

    

        const [itemsToShow, setItemsToShow] = useState(5); // Кількість постів, які відображаються на старті
        const loadMoreItems = () => {
            // При кожному виклику функції loadMoreItems додаємо 5 до кількості відображуваних елементів
            setItemsToShow(itemsToShow + 5);
        };

    return <div className="pagemain">
        <div className="pagemain__left">
            <div className="timeline__post">
                {isLoading ? (<p className="pagemain__loading">Завантаження...</p>) :

                <InfiniteScroll
                     dataLength={itemsToShow}
                     next={loadMoreItems}
                     hasMore={response?.PostFind?.length > itemsToShow} // Перевірка, чи є ще елементи для завантаження
                     loader={<p className="pagemain__loading">Завантаження...</p>}
                     endMessage={<p className="pagemain__loading">ВСЕ! Кінец.</p>} // Повідомлення, яке відображається після завантаження всіх елементів
                >
                    {response?.PostFind?.slice(0, itemsToShow).map((post) => (
                                <Post
                                    key={post._id} // Додаєм ключ для кожного поста
                                    _id={post._id}
                                    user={post.owner.login}
                                    postImage={post.images && post.images[0] && post.images[0].url}
                                    likesCountProp={post?.likesCount}
                                    likes={post.likes}
                                    text={post.text}
                                    comments={post.comments}
                                    owner={post.owner}
                                />
                            )
                    )}
                </InfiniteScroll>   }  
            </div>
        </div>
        <div className="pagemain__right">
            <Sugesstions nickName={"ВАСЯ"} _id={23655}/>
        </div>
    </div>
}

export default PageMain;