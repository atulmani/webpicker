import { useState } from "react"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import Avatar from "../../components/Avatar"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function ProjectComments({ booking }) {
  const { user } = useAuthContext()
  const { updateDocument, response } = useFirestore('bookings')
  const [newComment, setNewComment] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random()
    }

    await updateDocument(booking.id, {
      comments: [...booking.comments, commentToAdd],
    })
    if (!response.error) {
      setNewComment('')
    }
  }

  return (
    <div className="project-comments">
      <h4>Booking Comments</h4>

      <ul>
        {booking.comments.length > 0 && booking.comments.map(comment => (
          <li key={comment.id}>
            <div className="comment-author">
              <Avatar src={comment.photoURL} />
              <p>{comment.displayName}</p>
            </div>
            <div className="comment-date">
              <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}</p>
            </div>
            <div className="comment-content">
              <p>{comment.content}</p>
            </div>
          </li>
        ))}
      </ul>

      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  )
}