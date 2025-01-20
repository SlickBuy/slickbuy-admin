import { useCallback, useState } from 'react';
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

export const CreateCategoryForm = () => {
    const [category, setCategory] = useState();

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();
            try {
                const response = await fetch('http://localhost:3002/category/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ categoryName: category }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json();
                return responseData;
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        },
        [category]
    );

    return (
        <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
        >
            <Card>
                <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ pt: 1 }}>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    helperText="Моля добавете име на категория"
                                    label="Категория"
                                    name="category"
                                    onChange={(event) => setCategory(event.target.value)}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button type="submit" variant="contained">
                        Създай
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};
