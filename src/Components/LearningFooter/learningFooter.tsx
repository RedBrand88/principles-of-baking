import { useNavigate } from 'react-router-dom';
import Button from '../Button/button';
import './learningFooter.css';

type LearningFooterProps = {
  step: number;
};

const LearningFooter = ({ step }: LearningFooterProps) => {
  const navigate = useNavigate();

  const handleNext = () => {
    const nextStep = step + 1;
    navigate(`/learning/step/${nextStep}`);
  }

  const handleBack = () => {
    const previousStep = step > 1 ? step - 1 : 0;
    if (previousStep > 0) {
      navigate(`/learning/step/${previousStep}`);
    } else {
      navigate('/learn');
    }
  }

  return (
    <div className='footerContainer'>
      <div>
        {step > 0 && <Button onClick={handleBack}>Back</Button>}
      </div>
      <div>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default LearningFooter;
