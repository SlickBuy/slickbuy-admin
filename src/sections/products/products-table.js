import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
    Avatar,
    Box,
    Card,
    Checkbox,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    Button
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

export const ProductsTable = (props) => {
    const {
        productName = 0,
        items = [],
        onDeselectAll,
        onDeselectOne,
        onPageChange = () => {},
        onRowsPerPageChange,
        onSelectAll,
        onSelectOne,
        page = 0,
        rowsPerPage = 0,
        selected = []
    } = props;

    const selectedSome = selected.length > 0 && selected.length < items.length;
    const selectedAll = items.length > 0 && selected.length === items.length;

    return (
        <Card>
            <Scrollbar>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedAll}
                                        indeterminate={selectedSome}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                onSelectAll?.();
                                            } else {
                                                onDeselectAll?.();
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Product Brand</TableCell>
                                <TableCell>Product Price</TableCell>
                                <TableCell>Product Condition</TableCell>
                                <TableCell>Product Location</TableCell>
                                <TableCell>Business Name</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((product) => {
                                const isSelected = selected.includes(product.id);
                                // const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                                return (
                                    <TableRow hover key={product.id} selected={isSelected}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={(event) => {
                                                    if (event.target.checked) {
                                                        onSelectOne?.(product.id);
                                                    } else {
                                                        onDeselectOne?.(product.id);
                                                    }
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2">
                                                {product.productName}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{product.brand}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>{product.itemCondition}</TableCell>
                                        <TableCell>{product.location}</TableCell>
                                        <TableCell>{product.businessName}</TableCell>
                                        <TableCell>{product.category.categoryName}</TableCell>
                                        <TableCell>
                                            <Button href="/create-product" variant="contained">
                                                Start Auction
                                            </Button>
                                        </TableCell>
                                        {/* <TableCell>{createdAt}</TableCell> */}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </Scrollbar>
            {/* <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
        </Card>
    );
};

ProductsTable.propTypes = {
    count: PropTypes.number,
    items: PropTypes.array,
    onDeselectAll: PropTypes.func,
    onDeselectOne: PropTypes.func,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSelectOne: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array
};
