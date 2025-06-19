import { Box, Button, styled } from "@mui/material";
import {
  FirstPage,
  LastPage,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";

type PageNumberPickerProps = {
  pageNumber: number;
  totalPages: number;
  onPageNumberChange: (pageNumber: number) => void;
};

const PaginationButton = styled(Button)<{ isPicked?: boolean }>(
  ({ theme, ...ownerState }) => ({
    backgroundColor: ownerState.isPicked
      ? "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-activatedOpacity))"
      : theme.vars.palette.surfaceContainer.main,
    color: theme.vars.palette.primary.main,
    borderRadius: `${theme.shape.borderRadius * 2}px`,
    border: `1px solid ${theme.vars.palette.primary.main}`,
    fontSize: theme.typography.label.fontSize.large,
    minWidth: 0,
    width: "28px",
    height: "28px",
    opacity: ownerState.disabled
      ? "var(--mui-palette-action-disabledOpacity)"
      : undefined,
    "&:hover": {
      backgroundColor: ownerState.isPicked
        ? "rgba(var(--mui-palette-primary-mainChannel) / calc(var(--mui-palette-action-activatedOpacity) + var(--mui-palette-action-focusOpacity)))"
        : "var(--mui-palette-action-hover)",
    },
  })
);

function Pagination({
  pageNumber,
  totalPages,
  onPageNumberChange: pageNumberChangeHandler,
}: PageNumberPickerProps) {
  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === totalPages;
  const compactPageNumbers = getCompactPageNumbers(pageNumber, totalPages);
  return (
    <Box component="nav" display="flex" columnGap={2}>
      <Box>
        <PaginationButton
          disabled={isFirstPage}
          onClick={() => {
            if (isFirstPage) return;

            pageNumberChangeHandler(1);
          }}
          sx={{ mr: 0.5 }}
        >
          <FirstPage fontSize="small" sx={{ color: "primary.main" }} />
        </PaginationButton>
        <PaginationButton
          disabled={isFirstPage}
          onClick={() => {
            if (isFirstPage) return;

            pageNumberChangeHandler(pageNumber - 1);
          }}
        >
          <NavigateBefore fontSize="small" sx={{ color: "primary.main" }} />
        </PaginationButton>
      </Box>
      <Box display="flex" columnGap={1}>
        {compactPageNumbers.map((value, index) =>
          value !== null ? (
            <PaginationButton
              key={index}
              onClick={() => pageNumberChangeHandler(value)}
              isPicked={value === pageNumber}
            >
              {value}
            </PaginationButton>
          ) : (
            "..."
          )
        )}
      </Box>
      <Box>
        <PaginationButton
          disabled={isLastPage}
          onClick={() => {
            if (isLastPage) return;

            pageNumberChangeHandler(pageNumber + 1);
          }}
          sx={{ mr: 0.5 }}
        >
          <NavigateNext fontSize="small" sx={{ color: "primary.main" }} />
        </PaginationButton>
        <PaginationButton
          disabled={isLastPage}
          onClick={() => {
            if (isLastPage) return;

            pageNumberChangeHandler(totalPages);
          }}
        >
          <LastPage fontSize="small" sx={{ color: "primary.main" }} />
        </PaginationButton>
      </Box>
    </Box>
  );
}

function getCompactPageNumbers(pageNumber: number, totalPages: number) {
  if (totalPages <= 5) {
    return createNumberRange(1, totalPages);
  }
  if (pageNumber <= 2) {
    return [...createNumberRange(1, 3), null, totalPages];
  }
  if (pageNumber === 3) {
    return [...createNumberRange(1, 4), null, totalPages];
  }
  if (pageNumber === totalPages - 2) {
    return [1, null, ...createNumberRange(totalPages - 3, 4)];
  }
  if (pageNumber >= totalPages - 1) {
    return [1, null, ...createNumberRange(totalPages - 2, 3)];
  }
  return [
    1,
    null,
    pageNumber - 1,
    pageNumber,
    pageNumber + 1,
    null,
    totalPages,
  ];
}

function createNumberRange(start: number, count: number) {
  return Array.from({ length: count }, (_x, i) => start + i);
}

export default Pagination;
