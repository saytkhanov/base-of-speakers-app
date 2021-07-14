const { useEffect } = require("react");
const { useDispatch, useSelector } = require("react-redux");
const { speakerById } = require("../redux/features/speakers");

function Profile() {
    const dispatch = useDispatch()
    const speaker = useSelector(state => state.speakers.items)

    useEffect(() => {
        dispatch(speakerById())
    }, [dispatch])

    return (
        <div>
            {speaker.firstName}
        </div>
    )
}

export default Profile