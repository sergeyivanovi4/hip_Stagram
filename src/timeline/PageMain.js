import React, { useState } from "react";
import Sugesstions from "./Sugesstions";
import "./PageMain.css";
import Post from "./posts/Post"


function PageMain() {
    const [posts, setPosts] = useState([
        {
            user: 'test01',
            postImage: 'https://img.freepik.com/photos-premium/lac-montagnes-arriere-plan_901003-52335.jpg',
            likes: 12,
            text: '1д'
        },
        {
            user: 'pest02',
            postImage: 'https://img.freepik.com/photos-premium/lac-rochers-montagnes-arriere-plan_777078-68632.jpg',
            likes: 23,
            text: '20д'
        },
        {
            user: 'kest03',
            postImage: 'https://img.freepik.com/photos-premium/lac-montagne-montagne-arriere-plan_948735-127270.jpg',
            likes: 124,
            text: '3д'
        },
        {
            user: 'cest04',
            postImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjTiWeOf7hELubx7tEJ2-8Lsb_IfBu8rRWCK1VkwGA_10I5sjg7JWJrCIVupoMd-IR-Q0&usqp=CAU',
            likes: 10,
            text: '5г'
        },
    ])

    return <div className="pagemain">
        <div className="pagemain__left">
            <div className="timeline__post">
                {posts.map(post => (
                    <Post 
                    user={post.user} 
                    postImage={post.postImage} 
                    likes={post.likes} 
                    text={post.text} 
                    comments={[{text:"text1", user:"vasia"}, {text:"text2", user:"vasia"}, {text:"text3", user:"vasia"}, {text:"text4", user:"vasia"},{text:"text5", user:"vasia"},{text:"text6", user:"vasia"}]}
                    />
                ))}
            </div>
        </div>
        <div className="pagemain__right">
            <Sugesstions nickName={"ВАСЯ"} _id={23655}/>
        </div>
    </div>
}

export default PageMain;