import "./rightSide.scss";

const RightSide = () => {
    return (
        <div className="rightBar">
            <div className="container">
                <div className="item">
                    <span>Suggestions For You</span>
                    <div className="user">
                        <div className="userInfo">
                            <img
                                src="https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Image.jpg"
                                alt=""
                            />
                            <span>anonymous</span>
                        </div>

                        <button>Follow</button>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img
                                src="https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Image.jpg"
                                alt=""
                            />
                            <span>Coke Barry</span>
                        </div>
                        <button>Follow</button>
                    </div>
                </div>

                <div className="item">
                    <span>Online Friends</span>
                    <div className="user">
                        <div className="userInfo">
                            <img
                                src="https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Image.jpg"
                                alt=""
                            />
                            <div className="online" />
                            <span>Joker joke</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSide;
