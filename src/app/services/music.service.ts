import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  token =
    // eslint-disable-next-line max-len
    'Bearer BQAKelRsjFF4TkRjM0bSMlZ2vzgUzlw1n4P5x2ig7HASK6eG_p5viymi8gwH4Eo0tJjBoKUFvLig3JEtEp79HnUyVxntmQ8eOpSkCbkqB-x4GTlZEtj7EtSsgkmN6CJY9CC3ik-4kIeI8BbFtowLPG_30cV8rJc';

  constructor(private httpClient: HttpClient) {}

  getQuery(query: string) {
    const URL = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: this.token,
    });

    return this.httpClient.get(URL, { headers });
  }

  getRecommendationsGenre() {
    return this.getQuery('recommendations/available-genre-seeds').pipe(
      map((data: any) => data.genres)
    );
  }

  getPlaylist() {
    return this.getQuery('browse/featured-playlists').pipe(
      map((data: any) => data.playlists.items)
    );
  }

  getCategories() {
    return this.getQuery('browse/categories').pipe(
      map((data: any) => data.categories.items)
    );
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases').pipe(
      map((data: any) => data.albums.items)
    );
  }

  getPlaylistTracks(id: string) {
    return this.getQuery(`playlists/${id}/tracks?market=ES&offset=0`).pipe(
      map((data: any) => data.items)
    );
  }

  getCategoryTracks(term: string) {
    return this.getQuery(`search/?q=${term}&type=track`).pipe(
      map((data: any) => data.tracks.items)
    );
  }

  getAlbumTracks(id: string) {
    return this.getQuery(`albums/${id}/tracks?market=ES&offset=0`).pipe(
      map((data: any) => data.items)
    );
  }



  // getArtists(term: string) {
  //   return this.getQuery(`search?q=${term}&type=artist&limit=15`).pipe(
  //     map((data: any) => data.artists.items)
  //   );
  // }



  // getTracks(term: string) {
  //   return this.getQuery(`search?q=${term}&type=albums&limit=15`).pipe(
  //     map((data: any) => data.albums.items)
  //   );
  // }
}
