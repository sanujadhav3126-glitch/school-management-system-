import { Container, Grid, Paper } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";   // ✅ ADD THIS

import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();   // ✅ ADD THIS

    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector(state => state.user)

    const adminID = currentUser._id

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList?.length || 0;
    const numberOfClasses = sclassesList?.length || 0;
    const numberOfTeachers = teachersList?.length || 0;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>

                {/* Total Students */}
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper onClick={() => navigate("/Admin/students")}>
                        <img src={Students} alt="Students" />
                        <Title>Total Students</Title>
                        <Data start={0} end={numberOfStudents} duration={2.5} />
                    </StyledPaper>
                </Grid>

                {/* Total Classes */}
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper onClick={() => navigate("/Admin/classes")}>
                        <img src={Classes} alt="Classes" />
                        <Title>Total Classes</Title>
                        <Data start={0} end={numberOfClasses} duration={2.5} />
                    </StyledPaper>
                </Grid>

                {/* Total Teachers */}
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper onClick={() => navigate("/Admin/teachers")}>
                        <img src={Teachers} alt="Teachers" />
                        <Title>Total Teachers</Title>
                        <Data start={0} end={numberOfTeachers} duration={2.5} />
                    </StyledPaper>
                </Grid>

                {/* Fees Collection */}
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper onClick={() => navigate("/Admin/fees")}>
                        <img src={Fees} alt="Fees" />
                        <Title>Fees Collection</Title>
                        <Data start={0} end={23000} duration={2.5} prefix="$" />
                    </StyledPaper>
                </Grid>

                {/* Notices */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <SeeNotice />
                    </Paper>
                </Grid>

            </Grid>
        </Container>
    );
};


const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  }
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: green;
`;

export default AdminHomePage;