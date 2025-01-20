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

const ItemCondition = {
    NEW: 'New',
    USED: 'Used',
    SHELF: 'Shelf Pull'
};

export const CreateProductForm = () => {
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

    const [selectedFile, setSelectedFile] = useState({ imagePath: '' });

    const handleFileChange = (event) => {
        setValues((prevState) => ({
            ...prevState,
            image: event.target.files
        }));
    };

    const [categories, setCategories] = useState([]);
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

    const fetchCategories = async () => {
        try {
            const response = await fetchService.get('/category/get-all');
            setCategories(response);
        } catch (error) {
            console.error('GET Error:', error);
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);

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
                                    variant="outlined"
                                    name="image"
                                    type="file"
                                    inputProps={{
                                        accept: 'image/*' // Limit to image files
                                    }}
                                    onChange={handleFileChange}
                                    InputProps={{
                                        startAdornment: (
                                            <CloudUploadOutlinedIcon
                                                style={{ marginRight: '8px' }}
                                            />
                                        )
                                    }}
                                />
                                {selectedFile && <p>Selected file: {selectedFile.name}</p>}
                            </Grid>
                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Product name"
                                    name="productName"
                                    onChange={handleChange}
                                    required
                                    value={values.productName}
                                />
                            </Grid>
                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Brand"
                                    name="brand"
                                    onChange={handleChange}
                                    required
                                    value={values.brand}
                                />
                            </Grid>
                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Price"
                                    name="price"
                                    onChange={handleChange}
                                    required
                                    type="number"
                                    value={values.price}
                                />
                            </Grid>
                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Location"
                                    name="location"
                                    onChange={handleChange}
                                    required
                                    value={values.sizes}
                                />
                            </Grid>
                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Business name"
                                    name="businessName"
                                    onChange={handleChange}
                                    value={values.flavors}
                                />
                            </Grid>
                            <Grid xs={12} md={6}>
                                {!!categories.length && (
                                    <TextField
                                        fullWidth
                                        label="Choose product condition"
                                        name="itemCondition"
                                        onChange={handleChange}
                                        required
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.categoryId}>
                                        {categories.map((option) => (
                                            <option
                                                key={option.categoryId}
                                                value={option.categoryId}>
                                                {option.categoryName}
                                            </option>
                                        ))}
                                    </TextField>
                                )}
                            </Grid>
                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Choose Item Condition"
                                    name="itemCondition"
                                    onChange={handleChange}
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.itemCondition}>
                                    {Object.values(ItemCondition).map((condition) => (
                                        <option key={condition} value={condition}>
                                            {condition}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    helperText="Product description"
                                    label="Description"
                                    name="description"
                                    multiline
                                    minRows={4}
                                    onChange={handleChange}
                                    value={values.description}
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
