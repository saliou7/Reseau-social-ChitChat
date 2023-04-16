import Post from "./post"
import "./post.scss";

const Posts = () => {
    //TEMPORARY
    const posts = [
        {
            id: 1,
            name: "Joker XZT",
            userId: 1,
            profilePic:
                "https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Image.jpg",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            img: "https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Image.jpg",
        },
        {
            id: 2,
            name: "Titi riri",
            userId: 2,
            profilePic:
                "https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Picture.jpg",
            desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
            img: "https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Picture.jpg",
        },
    ];

    return <div className="posts">
        {posts.map(post => (
            <Post post={post} key={post.id} />
        ))}
    </div>;
};

export default Posts;
