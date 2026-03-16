import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom'

const ReturnButton = () => {
  const navigate = useNavigate();
  
  return (
    <button type='button' className='flex gap-2' onClick={() => navigate(-1)}>
        <ArrowLeft color='gray' size={32}/>
        Return
    </button>
  )
}

export default ReturnButton
