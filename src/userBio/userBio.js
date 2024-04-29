import React, { useEffect, useState } from 'react';
import "./userBio.css";
import Avatar from "@mui/material/Avatar";
import UserCounter from '../userCounter/UserCounter';
import { actionAboutMe, actionCreateAvatar, store, useGetPostFindsQuery, useGetUserByIdQuery, useSetUserNickMutation } from '../app/_store';
import { useDispatch } from 'react-redux';

function UserBio({
    // nick, 
	avatar, 
    incomings,
	_id, 
	login,
    followers,
    following,
    createdAt,
    postCount,
    isMyPage,
    isFollowers,
} 
) {
    const dispatch = useDispatch();
    // console.log("!!!", isMyPage , isFollowers)
    const [ btnProps, setBtnProps] = useState({ onClick: () => false, children: "Підписатись" })
    const [ isEditMode, setIsEditMode ] = useState(false);
    
    const [ updateNick, {isFetching, data}] = useSetUserNickMutation();
    const { isFetching: isFetchingFromBack, data: dataFromBack } = useGetUserByIdQuery(_id);
    const nick = dataFromBack?.UserFindOne?.nick

    const [ nickName, setNickName ] = useState("");

    useEffect(() => {
        if (dataFromBack?.UserFindOne?.nick)
            setNickName(dataFromBack.UserFindOne.nick)
    }, [dataFromBack]);

    const onSaveEditForm = (nick) => {
        updateNick({_id, nick})
        dispatch(actionAboutMe())
        setIsEditMode(false);
        clearForm()
    };
// console.log("!!!",nick, )


    useEffect(() => {
        if (isMyPage) {
            if (isEditMode) {
                setBtnProps({ onClick: () => onSaveEditForm(nickName), children: "Зберегти" })
            } else {
                setBtnProps({ onClick: () => setIsEditMode(true), children: "Редагувати" })
            }
        } else if (isFollowers) {
            setBtnProps({ onClick: () => false, children: "Відписатись" })
        } else {
            setBtnProps({ onClick: () => false, children: "Підписатись" })
        }
    }, [isMyPage, isFollowers, isEditMode, nickName])

    const nickNameInput = () => {
        if (isEditMode) {
            return <input value={nickName} onChange={e => setNickName(e.target.value)}/>
        } else {
            return <span className='userbio__nick'>{nickName || "Анонім"}</span>
        }  
    };

    const nickNamePut = nickNameInput(updateNick);

    const clearForm = () => {
        setNickName("")
    }

 // console.log("nickName1",nick, nickName, nickNamePut)
    const date = new Date(parseInt(createdAt));
    const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}року`;

    const [avatarImage, setAvatarImage] = useState(null); // Додали стан для фото

    useEffect(() => {
        if (avatar) {
            setAvatarImage(`http://hipstagram.node.ed.asmer.org.ua/${avatar}`);
        }
    }, [avatar]);

// Додаємо фото аватара
const handlePhotoChange = async () => {
    const fileInput = document.getElementById('photo');
    const formData = new FormData();
    formData.append('photo', fileInput.files[0]);
    const token = store.getState().auth.token;
    // console.log("token", token);
    try {
        const response = await fetch('http://hipstagram.node.ed.asmer.org.ua/upload', {
            method: "POST",
            headers: {...(token ? { Authorization: `Bearer ${token}` } : {})},
            body: formData
        });

        // дані після успішного завантаження
        const data = await response.json();
        // console.log("Файл успішно завантажено:", data);
        // Оновлюємо фото в стані після завантаження
            setAvatarImage(`http://hipstagram.node.ed.asmer.org.ua/${data.avatar}`);

            // Для оновлення аватара користувача
        //для оновлення аватара користувача
        dispatch(actionCreateAvatar(data._id));
    } catch (error) {
        console.error("Помилка завантаження файлу:", error);
    }
};
console.error("isMyPage", isMyPage);

  return (
    <div className="userbio">
        <div className='userbio__avatar__main'>
            {avatar ? (
                    <img src={`http://hipstagram.node.ed.asmer.org.ua/${avatar}`}  alt="logo" className="userbio__avatar" />
            ) : (
                    <Avatar className="userbio__avatar__Avatar" >{nick ? nick[0].toUpperCase() : login?.[0].toUpperCase()}</Avatar>
            )}
            {/* <form action="http://hipstagram.node.ed.asmer.org.ua/upload" method="post" enctype="multipart/form-data" id='form'> */}
            {isMyPage ? (<input type="file" name="photo" id='photo'  onChange={handlePhotoChange} className='userbio__avatar__input'/>) : (<div/>)}
            
            {/* </form> */}
        </div>

        <div className='userbio__info'>
            <div className='userbio__main'>
                <span className='userbio__nick'>
                    {nickNamePut}
                    {/* <input value={nickName || "Анонім"} onChange={e => setNickName(e.target.value)}/> */}
                    {/* {nick || "Анонім"} */}
                </span>
                <button {...btnProps} className='userbio__btn'/>
            </div>
            <div className='userbio__main'>
                <UserCounter count={postCount} text="Дописів" className='userbio__counter'/>
                <UserCounter count={followers?.length || 0} text="Читачів" className='userbio__counter'/>
                <UserCounter count={following?.length || 0} text="Стежить" className='userbio__counter'/>
            </div>
            <div className='userbio__main'>
                <span className='userbio__name'>Ваш логін: {login}</span>
                {/* <span className='userbio__name'>О собі: {incomings}</span> */}
            </div>
            <div className='userbio__main'>
                <span className='userbio__date'>Дата створення сторінки: {formattedDate}</span>
            </div>
        </div>
    </div>
  )
}

export default UserBio