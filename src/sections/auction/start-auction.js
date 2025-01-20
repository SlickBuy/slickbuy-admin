import { useCallback, useState, useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Unstable_Grid2 as Grid
} from '@mui/material';
import fetchService from 'src/api/fetch-service';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

export const StartAuctionForm = () => {
    const [values, setValues] = useState({
        productName: '',
        brand: '',
        price: 0,
        description: '',
        location: '',
        bussinesName: '',
        itemCondition: 'New',
        categoryId: 1,
        image: null
    });

    const handleChange = useCallback((event) => {
        const inputValue = event.target.value;
        const isNumber = event.target.name === 'categoryId' || event.target.name === 'price';
        setValues((prevState) => ({
            ...prevState,
            [event.target.name]: isNumber ? parseInt(inputValue, 10) : inputValue
        }));
    }, []);

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();
            try {
                const response = await fetchService.post('/product/create', values);
                console.log('POST Response:', response);
            } catch (error) {
                console.error('POST Error:', error);
            }
        },
        [values]
    );

    return (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card>
                <CardHeader subheader="Попълнете данните за продукта" title="Продукт" />
                <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ m: -1.5 }}>
                        <Grid container spacing={3}>
                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label=""
                                    name="productName"
                                    onChange={handleChange}
                                    required
                                    value={values.productName}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button type="submit" variant="contained">
                        Create
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};
