// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

import { Button, MobileStepper, Typography } from '@mui/material';
import { useState } from 'react';
import styles from './Onboarding.module.css';
import NextArrow from '../components/NextArrow';

const Onboarding1 = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <>
            <div className={styles.layout}>
                <div className={styles.container}>
                    <img src='../../public/assets/onboarding.svg' alt='onboarding' className={'w-[258px]'} />
                    <Typography variant='h1' gutterBottom>
                        This is the perfect time to visit your favorite event!
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                        Take stock of your performance and inspire yourself to reach even greater heights.
                    </Typography>
                    <MobileStepper
                        variant='dots'
                        classes={{
                            dots: styles.dots,
                            dot: styles.dot,
                            dotActive: styles.dotActive,
                        }}
                        steps={3}
                        position='static'
                        activeStep={activeStep}
                        sx={{ maxWidth: 400, flexGrow: 1 }}
                        nextButton={null}
                        backButton={null}
                    />
                    <Button
                        className={styles.nextButton}
                        variant='contained'
                        startIcon={
                            <div className={styles.nextArrowContainer}>
                                <NextArrow />
                            </div>
                        }
                    >
                        Got it, Next
                    </Button>
                    <Button variant='text'>Skip</Button>
                </div>
            </div>
        </>
    );
};

export default Onboarding1;
