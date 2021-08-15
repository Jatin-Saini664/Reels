import React, { useEffect, useState, useContext } from "react";
import { firebaseDB } from "../config/firebase";
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  makeStyles,
  Typography,
  TextField,
  Avatar,
  Container,
} from "@material-ui/core";
import {FavoriteIcon, FavoriteBorderOutlinedIcon} from '@material-ui/icons';
import {AuthContext} from "../context/AuthProvider";

const VideoPost = (props) => {
  let [user, setUser] = useState(null);
  let [comment, setComment] = useState("");
  let [commentList, setCommentList] = useState([]);
  let {currentUser} = useContext(AuthContext);
  let [like, setLike] = useState(false);
  let [totalLikes, setTotalLikes] = useState(0);
  // { comment , profilePhotoUrl }

  const onPostHandle = async() => {
    let doc = await firebaseDB.collection("users").doc(currentUser.uid).get();
    let userProfile = doc.data().profileImageUrl;
    let newCommentList = [...commentList, {profilePic:userProfile, comment:comment}];
    props.postObj.comments.push({uid:currentUser.uid, comment:comment});
    await firebaseDB.collection("posts").doc(props.postObj.pid).set({
      pid: props.postObj.pid,
      uid: props.postObj.uid,
      comments: props.postObj.comments,
      likes: props.postObj.likes,
      videoLink: props.postObj.videoLink,
    });
    setCommentList(newCommentList);
    setComment("");
  }

  const handleLike = async() => {
    if(like){
      
    }else{

    }
  }

  useEffect(async () => {
    console.log(props);
    let uid = props.postObj.uid;
    let doc = await firebaseDB.collection("users").doc(uid).get();
    let user = doc.data();
    let commentList = props.postObj.comments;
    // {uid , comment} , {uid , comment} , {uid , comment};
    let updatedCommentList=[];
    
    for(let i=0 ; i<commentList.length ; i++){
      let commentObj = commentList[i];
      let doc = await firebaseDB.collection("users").doc(commentObj.uid).get();
      let commentUserPic = doc.data().profileImageUrl;
      updatedCommentList.push({ profilePic: commentUserPic, comment: commentObj.comment });
    }
    
    console.log(updatedCommentList);
    setUser(user);
    setCommentList(updatedCommentList);
  }, []); //comp did Mount

  return (
    <Container style={{"margin-top":"10px", position:"relative", width:"50%"}}>
      <Card style={{ "min-height": "600px", width: "300px" }}>
        <Avatar src={user ? user.profileImageUrl : ""}></Avatar>
        <Typography variant="span">{user ? user.username : ""}</Typography>
        <div className="video-container">
          <Video src={props.postObj.videoLink}></Video>
        </div>
        {like? <FavoriteIcon onClick={handleLike}></FavoriteIcon>:<FavoriteBorderOutlinedIcon onClick={handleLike}></FavoriteBorderOutlinedIcon>}
        {totalLikes>0? <Typography variant="p">Liked by {totalLikes} people</Typography>:""}
        <Typography variant="p">Comments</Typography>

        <TextField
          variant="outlined"
          label="Add a comment"
          size="small"
          value={comment}
          onChange = {(e) => {setComment(e.target.value)}}
        ></TextField>
        <Button onClick={onPostHandle} variant="contained" color="secondary">
          Post
        </Button>

        {commentList.map((commentObj) => {
          return (
            <>
              <Avatar src={commentObj.profilePic}></Avatar>
              <Typography variant="p">{commentObj.comment}</Typography>
            </>
          );
        })}
      </Card>
    </Container>
  );
};

function Video(props) {
  return (
    <video
      style={{
        height: "80%",
        width: "100%",
      }}
      muted={true}
      loop={true}
      controls
    >
      <source src={props.src} type="video/mp4"></source>
    </video>
  );
}

export default VideoPost;