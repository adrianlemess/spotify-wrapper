import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { getAlbum, getAlbumTracks, getAlbums } from '../src/album';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

describe('Album', () => {
  let stubedFetch;
  let promise;

  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });
  describe('Smoke tests', () => {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.be.exist;
    });

    it('should have getAlbumTrack method', () => {
      expect(getAlbumTracks).to.be.exist;
    });
  });

  describe('getAlbum', () => {
    // verifica se o fetch ocorre
    it('should call fetch method', () => {
      const album = getAlbum();

      expect(stubedFetch).to.have.been.calledOnce;
    });

    // verifica se o fetch ocorre com a url certa
    it('should call fetch with the correct url', () => {
      const album = getAlbum('2HIwUmdxEl7SeWa1ndH5wC');

      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/2HIwUmdxEl7SeWa1ndH5wC');

      const album2 = getAlbum('2HIwUmdxEl7SeWa1ndH5wY');

      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/2HIwUmdxEl7SeWa1ndH5wY');
    });

    // verifica se o dado é recebido pela promise
    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const album = getAlbum('2HIwUmdxEl7SeWa1ndH5wC');

      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getAlbums', () => {
    it('should call a fetch method', () => {
      const albums = getAlbums('2HIwUmdxEl7SeWa1ndH5wC', '2HIwUmdxEl7SeWa1ndH5wB');

      expect(stubedFetch).to.have.been.calledOnce;
    });
    it('should call a fetch with the correct url', () => {
      const albums = getAlbums('2HIwUmdxEl7SeWa1ndH5wC', '2HIwUmdxEl7SeWa1ndH5wB');

      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/?ids=2HIwUmdxEl7SeWa1ndH5wC,2HIwUmdxEl7SeWa1ndH5wB');
    });

    it('should return the correct data from promise', () => {
      promise.resolves({ album: 'name' });
      const albums = getAlbums('2HIwUmdxEl7SeWa1ndH5wC', 'iqwhj12i3jlsd');

      expect(albums.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getTracks', () => {
    it('should call a fetch method', () => {
      const tracks = getAlbumTracks('2HIwUmdxEl7SeWa1ndH5wC');

      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const tracks = getAlbumTracks('2HIwUmdxEl7SeWa1ndH5wC');

      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/2HIwUmdxEl7SeWa1ndH5wC/tracks');
    });

    it('should return the correct data from a promise', () => {
      promise.resolves({ track: 'name' });

      const tracks = getAlbumTracks('2HIwUmdxEl7SeWa1ndH5wC');

      expect(tracks.resolveValue).to.be.eql({ track: 'name' });
    });
  });
});

