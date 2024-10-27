/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useMemo, useState } from "react";
import clsx from "clsx";

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Loader from "../loader/Loader";

function CommonDataTable({
  columns,
  response,
  isLoading,
  hiddenColumns = {},
}: any) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [{ pageIndex, pageSize }, setPagination] = useState<any>({
    pageIndex: 0,
    pageSize: 10,
  });

  const pagination = useMemo(
    () => ({
      pageIndex: pageIndex + 1,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const [sorting, setSorting] = useState<any>([]);

  // const prepareQueryForFilters = () => {
  //   const search = columnFilters.map((search: any) => {
  //     return {
  //       field: search.id === "user" ? "userId" : search.id,
  //       query: search.value,
  //       type: typeof search.value === "boolean" ? "EXACT" : "LIKE",
  //     };
  //   });

  //   const sortingQuery = {
  //     order: sorting[0]?.desc ? "DESC" : "ASC",
  //     field: sorting[0]?.id,
  //   };

  //   const result: any = {};

  //   if (search.length > 0) {
  //     result.search = search;
  //   }

  //   if (pageIndex + 1 > 0) {
  //     result.paginate = { page: pageIndex + 1, limit: pageSize };
  //   }

  //   if (sorting.length > 0) {
  //     result.sorting = sortingQuery;
  //   }
  //   return result;
  // };

  const resetPage = () => {
    setPagination({ pageIndex: 0, pageSize });
  };

  const table = useReactTable({
    data: response?.data || [],
    columns,
    state: {
      pagination: pagination,
      columnFilters,
      sorting,
      columnVisibility: hiddenColumns,
    },
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
    manualPagination: true,
    onPaginationChange: setPagination,
    onColumnFiltersChange: (newFilters) => {
      setColumnFilters(newFilters);
      resetPage();
    },
    onSortingChange: (newSorting) => {
      setSorting(newSorting);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: response?.totalPages || 0,
  });

  // useEffect(() => {
  //   refetchFn();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [sorting, pageIndex, columnFilters, pageSize]);

  // const records = useMemo(() => {
  //   if (!response || response.length === 0) {
  //     return null;
  //   }
  //   const limit = response.limit;
  //   const page = response.page;

  //   const startRecord =
  //     response?.totalDocs == 0 ? (page - 1) * limit : (page - 1) * limit + 1;
  //   const endRecord = Math.min(page * limit, response?.totalDocs);

  //   return { startRecord, endRecord };
  // }, [response]);

  // const CustomOption = (
  //   props: JSX.IntrinsicAttributes &
  //     OptionProps<unknown, boolean, GroupBase<unknown>>
  // ) => (
  //   <components.Option {...props}>
  //     <div className="flex justify-between">
  //       {props.label} {props.isSelected && <CheckBadgeIcon />}
  //     </div>
  //   </components.Option>
  // );

  return (
    <div>
      <div className="table_main overflow-x-auto h-[calc(100vh-295px)] relative">
        <table className="table_container">
          <thead className="sticky top-0 z-[11]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th scope="col" key={header.id}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: clsx(
                              {
                                "cursor-pointer select-none":
                                  header.column.getCanSort(),
                              },
                              "flex items-center gap-1"
                            ),
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {/* {specificColumnIDs.includes(header.column.id) ? (
                            <>
                              {{
                                asc: <SortIcon />,
                                desc: <SortIcon />,
                              }[header.column.getIsSorted() as string] ?? (
                                <SortIcon />
                              )}
                            </>
                          ) : null} */}
                        </div>
                        {/* {header.column.getCanFilter() ? (
                          <div>
                            <File column={header.column} />
                          </div>
                        ) : null} */}
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="max-h-[calc(100vh-28rem)]">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center">
                  <Loader size="lg" />
                </td>
              </tr>
            ) : (
              <>
                {response?.data.length > 0 &&
                  table.getRowModel().rows.map((row: any) => {
                    return (
                      <tr
                        key={row.id}
                        className={clsx({
                          "bg-gray-100": row?.original.isActive === false,
                        })}
                      >
                        {row.getVisibleCells().map((cell: any) => {
                          return (
                            <td key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                {response?.data.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan={5} className="text-center !py-6 !h-28">
                      No data available.
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-3 mt-3">
        {/* {records && (
          <>
            <span> Rows per page</span>
            <Select
              //   options={pageRowOptions}
              classNamePrefix="react-page_select"
              onChange={(option: any) =>
                table.setPageSize(Number(option?.value))
              }
              //   defaultValue={pageRowOptions[0]}
              components={{ Option: CustomOption }}
              menuPlacement={"top"}
              //   styles={dropDownArrowStyle}
              isSearchable={false}
            />
            <span>
              {records.startRecord}-{records.endRecord} of {response?.totalDocs}
            </span>
          </>
        )} */}
        {/* <Pagination
          pageIndex={pageIndex}
          table={table}
          setPageIndex={(newPageIndex: number) =>
            setPagination({ pageIndex: newPageIndex, pageSize })
          }
          pageCount={response?.totalPages || 0}
        /> */}
      </div>
    </div>
  );
}
export default memo(CommonDataTable);
