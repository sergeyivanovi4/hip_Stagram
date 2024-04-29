import React, { useState } from 'react';
import "./Sugesstions.css";
import Avatar from '@mui/material/Avatar';
import User from '../user/user';
import { useGetUserByIdQuery, useGetUsersQuery } from '../app/_store';
import { useHistory } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';


function Sugesstions({

}) {

    const { data: response, error, isLoading} = useGetUsersQuery(); // ?
    const [itemsToShow, setItemsToShow] = useState(15); 
    const loadMoreItems = () => {
        setItemsToShow(itemsToShow + 5);
    };

    console.log("Sugesstions", itemsToShow, response,)
  return (
    <div className='sugesstion'>
        <div className='sugesstion__title'>
            :Рекомендовані для Вас    
        </div>

        {isLoading ? (<p className="pagemain__loading">...Завантаження</p>) :

                <InfiniteScroll
                     dataLength={itemsToShow}
                     next={loadMoreItems}
                     hasMore={response.UserFind?.length > itemsToShow} // Перевірка, чи є ще елементи для завантаження
                     loader={<p>...Завантаження</p>}
                     endMessage={<p>Юзерів не має</p>} // Повідомлення, яке відображається після завантаження всіх елементів
                >

                {response?.UserFind.map((user) => 
                        <div key={user?._id} className='sugesstion__username'>
                                <User 
                                    key={user?._id} 
                                    _id={user?._id} 
                                    login={user?.login}
                                    avatar={user?.avatar?.url}
                                    nick={user?.nick}
                                    followers={user?.followers}
                                    following={user?.following}
                                    createdAt={user?.createdAt}
                                />
                        </div>
                )}
                </InfiniteScroll>}

        {/* {response?.UserFind.map((user) => 
                <div className='sugesstion__username'>
                        <div className='sugesstion__username__left' onClick={handleUserClick}>
                            
                            <div className='username__info'>
                                <span className='username'>{user.login} </span>
                                <span className='username__relation'>new to hipstagram</span>
                            </div>
                            <span className='avatar'>
                                <Avatar>R</Avatar>
                            </span>
                        </div>
                        <div className='sugesstion__follow__btn'>
                            Стежити
                        </div>
                </div>
    )    } */}

    </div>
  )
}

export default Sugesstions