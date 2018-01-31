import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { search, searchAlbums, searchPlaylist, searchArtists, searchTrack } from '../src/search';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');


describe('Search', () => {
  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke Test', () => {
    // Search genérico  (todos os tipos) e que pode buscar por mais de um tipo
    // searchAlbums
    // searchArtists
    // searchTracks
    // searchPlaylist

    it('should exists the search method', () => {
      expect(search).to.exist;
    });

    it('should exists the search method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exists the search method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exists the search method', () => {
      expect(searchTrack).to.exist;
    });

    it('should exists the search method', () => {
      expect(searchPlaylist).to.exist;
    });
  });

  describe('Generic Search', () => {

    it('should call fetch function', () => {
      const artists = search();

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('to one type ', () => {
        const artists = search('Incubus', 'artist');

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

        const albums = search('Incubus', 'album');

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
      });

      context('passing more than one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album']);

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
      });
    });

    it('should return a JSON data from the Promise', () => {
      promise.resolves({ body: 'json' });
      const artist = search('Incubus', 'artist');

      expect(artist.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = searchArtists('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');
      const artists2 = searchArtists('Anitta');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Anitta&type=artist');
    });
  });

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = searchAlbums('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
      const albums2 = searchAlbums('Anitta');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Anitta&type=album');
    });
  });

  describe('searchTracks', () => {
    it('should call fetch function', () => {
      const tracks = searchTrack('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const track = searchTrack('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track');
      const track2 = searchTrack('Anitta');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Anitta&type=track');
    });
  });

  describe('searchPlaylist', () => {
    it('should call fetch function', () => {
      const playlist = searchArtists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const playlist = searchPlaylist('Incubus');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');
      const playlist2 = searchPlaylist('Anitta');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Anitta&type=playlist');
    });
  });
});


