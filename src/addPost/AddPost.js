import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { actionSavePost, store } from '../app/_store';

import "./AddPost.css";
import { useDispatch } from 'react-redux';




function AddPost() {
  const user = useSelector(state => state.auth.userInfo);
  const dispatch = useDispatch();

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  display: 'flex',
  padding: grid,
  width: 'auto'
});

const DND = ({onChange, items, render:Render}) => {
  const onDragEnd = (result) => {
      // dropped outside the list
      if (!result.destination) {
          return;
      }

      const newItems = reorder(
          items,
          result.source.index,
          result.destination.index
      );

      onChange(newItems)
  }
  return (
      <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction='horizontal'>
              {(provided, snapshot) => (
                  <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                  >
                      {items.map((item, index) => (
                          <Draggable key={item._id} draggableId={item._id} index={index}>
                              {(provided, snapshot) => (
                                  <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={getItemStyle(
                                          snapshot.isDragging,
                                          provided.draggableProps.style
                                      )}
                                  >
                                      <Render item={item}/>
                                      
                                  </div>
                              )}
                          </Draggable>
                      ))}
                      {provided.placeholder}
                  </div>
              )}
          </Droppable>
      </DragDropContext>
  )
}

const DNDImage = ({item}) =>
  <img key={item._id} style={{maxWidth: '150px'}} src={`http://hipstagram.node.ed.asmer.org.ua/${item.url}`} />


const chatId = '65ce6235adf3bd0ee7be97c8'

          // <DropzoneWithUpload onUpload={file => setMessage({...message, media: [...message.media, file]})}>


function Dropzone({onFile, children}) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      noDragEventsBubbling: true
  });

  useEffect(() => {
      if (acceptedFiles[0])
          onFile(acceptedFiles[0])
  },[acceptedFiles[0]])

  return (
      <section className="container">
          <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              {children || <p>Перетягнить сюди файлік або клікніте щоб було круто</p>}
          </div>            
      </section>
  );
}

const uploadFile = file => {
  const formData = new FormData
  formData.append('photo', file)
  const token = store.getState().auth.token;

  return fetch('http://hipstagram.node.ed.asmer.org.ua/upload',{
      method: 'POST',
      headers: {...(token ? { Authorization: `Bearer ${token}` } : {})},
      body: formData
  }).then(res => res.json())
}

const DropzoneWithUpload = ({onUpload, children}) => {
  return (
      <Dropzone onFile={file => uploadFile(file).then(onUpload)}>
          {children}
      </Dropzone>
  )
}


const EditPost = ({defaultPost={text: '', images:[]}}) => {
  const [newPost, setNewPost] = useState(defaultPost)
  useEffect(() => setNewPost(defaultPost), [JSON.stringify(defaultPost)])
  // console.log("newPost", newPost)

  const clearForm = () => {
    setNewPost({ text: '', images: [] });
  }
  
  const onSave = (post) => {
    if (post.images.length > 0) { // перевірка чи є фото
      const _id = post.images[0]._id;
      dispatch(actionSavePost(_id));
      // console.log("post", _id);
      alert("Загрузка закінчена, Вітаю Вас!");
      clearForm();
    } else {
      alert("Будь ласка, додайте фотографію!");
    }
  }
  
  return (
      <div className='addpost__editpost'>

          <DropzoneWithUpload onUpload={file => setNewPost({...newPost, images: [...newPost.images, file]})}
              style={{ height: "150px" }} 
          >
              <strong style={{ display: 'block', color: '#1aacd4', fontSize: "40px", textAlign: "center", width: "500px"}} >КИНЬ СЮДИ ФОТОЧКУ  або тицні</strong>
          </DropzoneWithUpload>
          <DND items={newPost.images} onChange={images => setNewPost({...newPost, images})} render={DNDImage} 
              style={{ background: '#1aacd4' }} 
          />         
          <input placeholder="Додай текст" value={newPost.text} onChange={e => setNewPost({...newPost, text: e.target.value})} 
              style={{ height: "24px", width: "500px" }} 
              className='addpost__input'
          />
          <button onClick={() => onSave(newPost)} className='addpost__btn'>Запостити пост</button>
      </div>
  )
}
  return (
    <div className='addpost'>
        <div className='addpost__header' >
          ДОДАЄМО ПОСТ:
        </div>
        <EditPost />
    </div>
  )
}

export default AddPost