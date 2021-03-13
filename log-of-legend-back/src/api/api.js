const axios = require("axios");

const API_KEY = "RGAPI-4d0083e2-daec-49ba-8e63-b3eec2ed4be0";

const riotgames = axios.create({
  baseURL: "https://kr.api.riotgames.com/lol/",
  headers: { "X-Riot-Token": API_KEY },
});

const ddragon =  axios.create({
  baseURL: "https://some-domain.com/api/",
  headers: { "X-Riot-Token": API_KEY },
});

const config = {
  headers: {
    "X-Riot-Token": API_KEY,
  },
};

const api = {
  async championRotations() {
    const {
      data: { freeChampionIds },
    } = await axios.get(
      "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations",
      config
    );
    const {
      data: { data },
    } = await axios.get(
      "http://ddragon.leagueoflegends.com/cdn/10.25.1/data/ko_KR/champion.json"
    );

    const championKeys = Object.keys(data);
    const result = [];
    championKeys.map((championKey) => {
      freeChampionIds.filter((freeChampionId) => {
        if (data[championKey].key == freeChampionId) {
          result.push(data[championKey]);
        }
      });
    });
    return result;
  },

  async platformData() {
    const { data } = await axios.get(
      "https://kr.api.riotgames.com/lol/status/v4/platform-data",
      config
    );
    return data;
  },

  async challengerRank() {
    const {
      data: { entries },
    } = await axios.get(
      "https://kr.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5",
      config
    );

    for (let i = 0; i < entries.length; i++) {
      for (let j = i + 1; j < entries.length; j++) {
        if (entries[i].leaguePoints < entries[j].leaguePoints) {
          const temp = entries[i];
          entries[i] = entries[j];
          entries[j] = temp;
        }
      }
    }
    return entries;
  },

  async summonerInfo(summonerName) {
    const {
      data: { id, profileIconId, accountId, summonerLevel },
    } = await axios.get(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
      config
    );
    const { data } = await axios.get(
      `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`,
      config
    );

    data.forEach((info) => {
      info.accountId = accountId;
      info.summonerLevel = summonerLevel;
      info.profileIconId = profileIconId;
    });
    return data;
  },

  async matchList(accountId, startIndex, endIndex) {
    const {
      data: { matches },
    } = await axios.get(
      `https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=5&beginIndex=0`,
      config
    );
    const matchList = [];

    for (let i = 0; i < matches.length; i++) {
      const { data } = await axios.get(
        `https://kr.api.riotgames.com/lol/match/v4/matches/${matches[i].gameId}`,
        config
      );
      matchList.push(data);
    }
    return matchList;
  },
};

module.exports = api;