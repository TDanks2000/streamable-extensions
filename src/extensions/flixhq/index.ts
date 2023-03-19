import axios from "axios";
import { load } from "cheerio";
import {
  IEpisodeServer,
  IMediaInfo,
  IMediaResult,
  ISearch,
  ISource,
  MediaProvier,
  TvType,
} from "../../types";

import extensionJSON from "./extension.json";

class FlixHQ extends MediaProvier {
  protected baseUrl: string = extensionJSON.code.utils.mainURL;

  override async search(
    query: string,
    page: number = 1
  ): Promise<ISearch<IMediaResult>> {
    const searchResult: ISearch<IMediaResult> = {
      currentPage: page,
      hasNextPage: false,
      results: [],
    };

    const url = `${this.baseUrl}/search/${query}`;

    try {
      const { data } = await axios.get(url);
      const $ = load(data);

      const navSelector =
        "div.pre-pagination:nth-child(3) > nav:nth-child(1) > ul:nth-child(1)";

      searchResult.hasNextPage =
        $(navSelector).length > 0
          ? !$(navSelector).children().last().hasClass("active")
          : false;

      $(".film_list-wrap > div.flw-item").each((i, el) => {
        const releaseDate = $(el)
          .find("div.film-detail > div.fd-infor > span:nth-child(1)")
          .text();
        searchResult.results.push({
          id: $(el).find("div.film-poster > a").attr("href")?.slice(1)!,
          title: $(el).find("div.film-detail > h2 > a").attr("title")!,
          url: `${this.baseUrl}${$(el)
            .find("div.film-poster > a")
            .attr("href")}`,
          image: $(el).find("div.film-poster > img").attr("data-src"),
          releaseDate: isNaN(parseInt(releaseDate)) ? undefined : releaseDate,
          seasons: releaseDate.includes("SS")
            ? parseInt(releaseDate.split("SS")[1])
            : undefined,
          type:
            $(el)
              .find("div.film-detail > div.fd-infor > span.float-right")
              .text() === "Movie"
              ? TvType.MOVIE
              : TvType.TVSERIES,
        });
      });

      return searchResult;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  getMediaInfo(animeId: string, ...args: any): Promise<IMediaInfo> {
    throw new Error("Method not implemented.");
  }

  getMediaSources(episodeId: string, ...args: any): Promise<ISource> {
    throw new Error("Method not implemented.");
  }

  getMediaServers(episodeId: string): Promise<IEpisodeServer[]> {
    throw new Error("Method not implemented.");
  }
}

(async () => {
  const flixhq = new FlixHQ();
  const search = await flixhq.search("test");
  console.log(search);
})();

module.exports = FlixHQ;
