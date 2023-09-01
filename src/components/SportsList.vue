<template>
      <section class="table-custom">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="table-responsive">
    <table v-if="loading" class="table table-borderless">
      <!-- Skeleton Loading Rows -->
      <tbody>
        <tr v-for="n in pageSize" :key="n">
          <td><div class="skeleton loading">&nbsp;</div></td>
          <!-- <td><div class="skeleton loading">&nbsp;</div></td>
          <td><div class="skeleton loading">&nbsp;</div></td>
          <td><div class="skeleton loading">&nbsp;</div></td>
          <td><div class="skeleton loading">&nbsp;</div></td>
          <td><div class="skeleton loading">&nbsp;</div></td>
          <td><div class="skeleton loading">&nbsp;</div></td>
          <td><div class="skeleton loading">&nbsp;</div></td>
          <td><div class="skeleton loading">&nbsp;</div></td>
          <td><div class="skeleton loading">&nbsp;</div></td>
          <td><div class="skeleton loading">&nbsp;</div></td>
          <td><div class="skeleton loading">&nbsp;</div></td> -->
        </tr>
      </tbody>
    </table>

    <table v-else class="table table-borderless">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th>Form</th>
          <th>GP</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>GF</th>
          <th>GA</th>
          <th>GD</th>
          <th>Pts</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="team in displayedTeams" :key="team.teamid">
          <td>{{ team.intRank }}</td>
          <td><img :src="team.strTeamBadge" alt="Team Logo" class="team-logo" /></td>
          <td>{{ team.strTeam }}</td>
          <td>
            <span
              v-for="(result, index) in team.strForm"
              :key="index"
              :class="{
                'fas fa-check text-success': result === 'W',
                'fas fa-times text-danger': result === 'L',
                'fas fa-minus text-secondary': result === 'D'
              }"
              :style="{
                backgroundColor: result === 'W' ? 'green' : result === 'L' ? 'red' : 'gray',
                padding: '10px',
                borderRadius: '100%',
                marginRight: '10px',
              }"
            ></span>
          </td>
          <td>{{ team.intPlayed }}</td>
          <td>{{ team.intWin }}</td>
          <td>{{ team.intDraw }}</td>
          <td>{{ team.intLoss }}</td>
          <td>{{ team.intGoalsFor }}</td>
          <td>{{ team.intGoalsAgainst }}</td>
          <td>{{ team.intGoalDifference }}</td>
          <td>{{ team.intPoints }}</td>
        </tr>
      </tbody>
    </table>
    <button style="margin: auto;display: block;" v-if="showLoadMoreButton" @click="loadMore" class="btn btn-primary ">
      Load more
    </button>
  </div>
          </div>
        </div>
      </div>
    </section>

</template>

<script>
export default {
  data() {
    return {
      teams: [],
      displayedTeams: [],
      pageSize: 5,
      itemsPerPage: 3,
      loading: true
    };
  },
  async mounted() {
    await this.fetchData();
    this.updateDisplayedTeams();
    this.loading = false;
     // Mark loading as finished after fetching data

  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch(
          'https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4328&s=2020-2021'
        );
        const data = await response.json();
        // setTimeout(() => {
          this.teams = data.table;
        // }, 2000);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    updateDisplayedTeams() {
      this.displayedTeams = this.teams.slice(0, this.pageSize);
    },
    loadMore() {
      const startIndex = this.displayedTeams.length;
      const endIndex = startIndex + this.itemsPerPage;
      this.displayedTeams = this.displayedTeams.concat(
        this.teams.slice(startIndex, endIndex)
      );

      // Hide the "Load more" button if all teams are displayed
      this.showLoadMoreButton = endIndex < this.teams.length;
    },
  },
  computed: {
    showLoadMoreButton() {
      return this.displayedTeams.length < this.teams.length;
    },
  },
};
</script>