import { useNavigate } from 'react-router-dom'

const ReturnButton = () => {
    const navigate = useNavigate();
  return (
    <button type='button' onClick={() => navigate(-1)}>
        Return
    </button>
  )
}

export default ReturnButton
