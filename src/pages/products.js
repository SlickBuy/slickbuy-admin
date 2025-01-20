import { useCallback, useMemo, useState, useEffect } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ProductsTable } from "src/sections/products/products-table";
import { applyPagination } from "src/utils/apply-pagination";
import fetchService from "src/api/fetch-service";

const now = new Date();

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [products, setProducts] = useState([]);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetchService.get("/product/get-all");
      console.log(response);
      setProducts(response);
    } catch (error) {
      console.error("GET Error:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Head>
        <title>Customers | Supplement store</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  href="/create-product"
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            {!!products.length && (
              <ProductsTable
                count={products.length}
                items={products}
                // onDeselectAll={customersSelection.handleDeselectAll}
                // onDeselectOne={customersSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                // onSelectAll={customersSelection.handleSelectAll}
                // onSelectOne={customersSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                // selected={customersSelection.selected}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
