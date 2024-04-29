import React, { useEffect, useState } from "react";
import UserBio from "../userBio/userBio";
import "./UserPage.css";
import { useGetFindOneQuery, useGetPostFindsQuery } from "../app/_store";
import UserCardPhotos from "../userCardPhoto/UserCardPhotos";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";




function UserPage({ _id}) {
// console.log("UserPage_id_id_id_id_id_id", _id)
	const { data: response, error, isLoading } = useGetFindOneQuery(_id); // ?
	const { data: postData, errorPost } = useGetPostFindsQuery(_id);
// console.log("errorPost", errorPost, error)
	const userAuth = useSelector(state => state.auth?.userInfo?._id);
	
	console.log("!!responsePageuseruser", response)
// console.log("!!data", postData)
  
  	const user = response?.UserFindOne;
	const posts = postData?.PostFind

// console.log("UserPageuseruser", user)
// console.log("userAuth", userAuth)

  	const [ postCount, setPostCount ] = useState(0);
 	const [ postForRender, setPostForRender ] = useState([]);
	const [ page, setPage] = useState(0);


  useEffect(() => {
	// const newPost = [...postData?.PostFind]
    if (postData && postData.PostFind) {
      setPostCount(posts.length);
	  setPostForRender([...postData?.PostFind].slice(0, 12))
    }
  }, [postData]);


  const loadMoreItems = () => {
		const newPost = [...posts];
		const offset = 12 * (page + 1);

		setPostForRender([...postForRender, ...newPost.slice(offset, offset + 12)]);
		setPage(page + 1);
  }

  return (
    <div className="userpage">

			<UserBio
				avatar={user?.avatar?.url}
				_id={user?._id}
				nick={user?.nick}
				login={user?.login}
				followers={user?.followers}
				following={user?.following}
				createdAt={user?.createdAt}
				postCount={postCount}
				incomings={user?.incomings?.text}
				isMyPage={userAuth === user?._id }
				isFollowers={user?.followers?.includes(userAuth)}
			/>

		<div className="userpage__content">
			
		{!errorPost && isLoading ? (<p className="userpage__loading">Завантаження...</p>) :
			<InfiniteScroll
				dataLength={postForRender.length}
				next={loadMoreItems}
				hasMore={postData?.PostFind?.length > postForRender.length} // Перевірка, чи є ще елементи для завантаження
				loader={<p className="userpage__loading">Завантаження...</p>}
				endMessage={<p className="userpage__loading__end">Постів не має</p>}
				className="userpage__scrool"
				
			>
					{postForRender?.map((post) => (
                                <UserCardPhotos 
                                    key={post?._id} // Додаєм ключ для кожного поста
                                    _id={post?._id}
									images={post?.images}
									likes={post?.likes}
									likesId={post?.likes?._id}
									avatar={post?.owner?.avatar?.url}
									id={post?.owner?._id}
									login={post?.owner?.login}
									nick={post?.owner?.nick}
									postImage={post?.images && post?.images[0] && post?.images[0].url}
									postImageId={post?.images?._id}
                                    // text={post?.text || ""}
                                    comments={post?.comments}
									commentsText={post?.comments?.text}
                                    owner={post?.owner}
                                    isLoading={isLoading}
                                />
                            )
                    )}
			</InfiniteScroll> }
		</div>
    </div>
  );
}

export default UserPage;
