import React, { useEffect, useState } from "react";
import UserBio from "../userBio/userBio";
import "./UserPage.css";
import { useGetFindOneQuery, useGetPostFindsQuery } from "../app/_store";
import UserCardPhotos from "../userCardPhoto/UserCardPhotos";




function UserPage({ _id}) {
  // console.log("UserPage_id_id_id_id_id_id", _id)
  const { data: response, error, isLoading } = useGetFindOneQuery(_id); // ?
  const { data: postData } = useGetPostFindsQuery(_id);

  
console.log("!!responsePageuseruser", response)
console.log("!!data", postData)



  
  const user = response?.UserFindOne;
  console.log("UserPageuseruser", user)
 

  const [postCount, setPostCount] = useState(0);
 
  useEffect(() => {
    if (postData && postData.PostFind) {
      setPostCount(postData.PostFind.length);
    }
  }, [postData]);

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
		/>

		<div className="userpage__content">

			 {postData?.PostFind?.map((post) => (
                                <UserCardPhotos 
                                    key={post?._id} // Додаєм ключ для кожного поста
                                    _id={post?._id}
									images={post?.images}
									likes={post?.likes}
									likesId={post?.likes?._id}
									avatar={post?.owner.avatar?.url}
									id={post?.owner._id}
									login={post?.owner.login}
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


		</div>

    </div>
  );
}

export default UserPage;
