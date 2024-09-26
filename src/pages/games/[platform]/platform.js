import { Container } from "semantic-ui-react";
import { size } from "lodash";
import { BasicLayout } from "@/layouts";
import {
  GridGames,
  Separator,
  NoResult,
  Pagination,
} from "@/components/Shared";

export default function PlatformPage(props) {
  const { games, platform, pagination } = props;
  const hasProducts = size(games.data) > 0;

  return (
    <>
      <BasicLayout relative>
        <Container>
          <Separator height={50} />

          <h2>{platform.attributes.title}</h2>

          {hasProducts ? (
            <>
              <GridGames games={games.data} />
              <Separator height={30} />
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pageCount}
              />
            </>
          ) : (
            <NoResult
              text={`La Categoria ${platform.attributes.title} aun no tiene productos`}
            ></NoResult>
          )}
          <Separator height={100} />
        </Container>
      </BasicLayout>
    </>
  );
}
