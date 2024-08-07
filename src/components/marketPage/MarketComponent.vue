<script setup>
import IronImage from '@/assets/iron.png';
import BronzeImage from '@/assets/bronze.png';
import SilverImage from '@/assets/silver.png';
import GoldImage from '@/assets/gold.png';
import PlatinumImage from '@/assets/platinum.png';
import EmeraldImage from '@/assets/emerald.png';
import DiamondImage from '@/assets/diamond.png';
import MasterImage from '@/assets/master.png';
import GrandmasterImage from '@/assets/grandmaster.png';
import ChallengerImage from '@/assets/challenger.png';
import {ref, computed, onMounted} from "vue";
import getLeagueAcc from "@/apis/getLeagueAcc.js";

const search = ref("");
const rankFilter = ref(null);
const skinFilter = ref(null);
const championFilter = ref(null);
const priceRange = ref([0, 1000]);
const page = ref(1);
const pageSize = 12;
const accounts = ref([]);
const maxPrice = 1000;

const rankOptions = ["All", "Iron", "Bronze", "Silver", "Gold", "Platinum", "Emerald", "Diamond", "Master", "Grandmaster", "Challenger"];
const skinOptions = ["All", "0-10", "11-50", "51-100", "100+"];
const championOptions = ["All", "0-20", "21-50", "51-100", "100+"];

const filteredAccounts = computed(() => {
    return accounts.value.filter((account) => {
        return (
            account.name.toLowerCase().includes(search.value.toLowerCase()) &&
            ((rankFilter.value === "All" || !rankFilter.value) ? true : account.rank === rankFilter.value) &&
            ((skinFilter.value === "All" || !skinFilter.value) ? true : filterRange(account.skins, skinFilter.value)) &&
            ((championFilter.value === "All" || !championFilter.value) ? true : filterRange(account.champions, championFilter.value)) &&
            account.price >= priceRange.value[0] &&
            account.price <= priceRange.value[1]
        );
    });
});

const filteredAccountPagination = computed(() => {
    const start = (page.value - 1) * pageSize;
    const end = start + pageSize;
    return filteredAccounts.value.slice(start, end);
});

const pageCount = computed(() => {
    return Math.ceil(filteredAccounts.value.length / pageSize);
});

const filterRange = (value, range) => {
    if (range === "All") return true;

    // Special case for "100+"
    if (range === "100+") {
        return value >= 100;
    }

    const [min, max] = range.split("-");
    if (max === "+") {
        return value >= Number(min);
    } else {
        return value >= Number(min) && value <= Number(max);
    }
};

const updatePriceRange = (index, event) => {
    const newValue = Number(event);
    if (!isNaN(newValue)) {
        priceRange.value[index] = newValue;
    }
};

function setRankImage(rank) {
    switch (rank) {
        case 'Iron':
            return IronImage;
        case 'Bronze':
            return BronzeImage;
        case 'Silver':
            return SilverImage;
        case 'Gold':
            return GoldImage;
        case 'Platinum':
            return PlatinumImage;
        case 'Emerald':
            return EmeraldImage;
        case 'Diamond':
            return DiamondImage;
        case 'Master':
            return MasterImage;
        case 'Grandmaster':
            return GrandmasterImage;
        case 'Challenger':
            return ChallengerImage;
        default:
            return IronImage;
    }
}

async function getAccounts() {
    try {
        const response = await getLeagueAcc();
        accounts.value = response;
        console.log(accounts.value);
    } catch (error) {
        console.error(error);
    }
}

onMounted(getAccounts);
</script>

<template>
    <v-container>
        <v-row justify="center" align="center" class="py-8"
               style="background: linear-gradient(to right, #1a237e, #4a148c);">
            <v-col cols="12">
                <h1 class="text-h2 font-weight-bold text-center text-uppercase mb-6"
                    style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                    <span class="blue--text text--lighten-3">League of Legends </span>
                    <span class="purple--text text--lighten-3">Accounts</span>
                </h1>
            </v-col>
        </v-row>

        <!-- Search and Filters -->
        <v-card class="my-6 elevation-3 bg-grey-darken-4" elevation="0">
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="4" md="5">
                        <v-text-field
                            v-model="search"
                            label="Search accounts"
                            prepend-inner-icon="mdi-magnify"
                            variant="underlined"
                            dense
                            color="primary"
                            aria-label="Search accounts"
                            :aria-describedby="`search-desc`"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="7">
                        <v-range-slider :step="0.2" v-model="priceRange" :max="maxPrice" :min="0" hide-details
                                        class="align-center" color="grey-lighten-1">
                            <template v-slot:prepend>
                                <v-text-field
                                    v-model="priceRange[0]"
                                    class="mt-0 pt-0"
                                    hide-details
                                    single-line
                                    variant="outlined"
                                    type="number"
                                    style="width: 100px"
                                    @change="updatePriceRange(0, $event)"
                                ></v-text-field>
                            </template>
                            <template v-slot:append>
                                <v-text-field
                                    v-model="priceRange[1]"
                                    class="mt-0 pt-0"
                                    hide-details
                                    single-line
                                    variant="outlined"
                                    type="number"
                                    style="width: 100px "
                                    @change="updatePriceRange(1, $event)"
                                ></v-text-field>
                            </template>
                        </v-range-slider>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="2">
                        <v-select v-model="rankFilter" :items="rankOptions" label="Rank" variant="underlined" dense
                                  color="primary"></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="2">
                        <v-select v-model="skinFilter" :items="skinOptions" label="Skins" variant="underlined" dense
                                  color="primary"></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="2">
                        <v-select
                            v-model="championFilter"
                            :items="championOptions"
                            label="Champions"
                            variant="underlined"
                            dense
                            color="primary"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <!-- Account Listings -->
        <v-row>
            <v-col v-for="account in filteredAccountPagination" :key="account.id" cols="12" sm="6" md="4" lg="3"
                   class="d-flex justify-center">
                <v-card class="elevation-3 hover-effect lol-account-card w-100">
                    <v-img :src="setRankImage(account.rank)" height="200px" class="rank-image"></v-img>
                    <v-card-title class="text-h5 font-weight-bold">{{ account.name }}</v-card-title>
                    <v-card-text>
                        <p class="subtitle-1">
                            <v-icon class="mr-1">mdi-star</v-icon>
                            <strong>Rank:</strong> <span class="rank-text">{{ account.rank }}</span></p>
                        <p class="subtitle-1">
                            <v-icon class="mr-1">mdi-format-paint</v-icon>
                            <strong>Skins:</strong> <span class="skins-text">{{ account.skins }}</span></p>
                        <p class="subtitle-1">
                            <v-icon class="mr-1">mdi-sword</v-icon>
                            <strong>Champions:</strong> <span class="champions-text">{{ account.champions }}</span></p>
                        <p class="subtitle-1">
                            <v-icon class="mr-1">mdi-currency-usd</v-icon>
                            <strong>Price:</strong> <span class="price-text">${{ account.price }}</span></p>
                    </v-card-text>
                    <v-card-actions>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-btn
                                    color="primary"
                                    text
                                    size="small"
                                    class="w-100"

                                >
                                    <v-icon size="18" class="mx-1">mdi-eye</v-icon>
                                    View Details
                                </v-btn>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-btn
                                    color="success"
                                    text
                                    size="small"
                                    class="w-100"

                                >
                                    <v-icon size="18" class="mr-1">mdi-cart</v-icon>
                                    Buy Now
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <!-- Pagination -->
        <v-pagination
            :size="$vuetify.display.smAndDown? 'small': 'default'"
            v-model="page"
            :length="pageCount">
        </v-pagination>
    </v-container>
</template>


<style scoped>
.text-center {
    text-align: center;
}

.text-primary {
    color: #1976d2;
}

.hover-effect:hover {
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
}

.v-card-title {
    font-size: 18px;
    font-weight: bold;
}

.v-card-text p {
    margin: 0;
    font-size: 14px;
}

.v-pagination {
    justify-content: center;
}

@media (max-width: 600px) {
    .v-text-field,
    .v-select,
    .v-range-slider {
        width: 100%;
    }
}

.lol-account-card {
    background-color: #1a1a2e; /* Dark blue background */
    color: #e0e0e0; /* Light gray text for contrast */
    border: 2px solid #4a4e69; /* Subtle border */
    transition: all 0.3s ease;
    max-width: 380px;
}

.lol-account-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.rank-image {
    border-bottom: 2px solid #4a4e69;
}


.rank-text {
    color: #ff6b6b; /* Red color for rank */
}

.skins-text {
    color: #4ecdc4; /* Teal color for skins */
}

.champions-text {
    color: #45b7d1; /* Light blue for champions */
}

.price-text {
    color: #66bb6a; /* Green color for price */
}

.v-btn {
    text-transform: uppercase;
    font-weight: bold;
}

.v-btn.primary {
    background-color: #3498db !important;
}

.v-btn.success {
    background-color: #2ecc71 !important;
}

.v-icon {
    color: #ffd700; /* Gold color for icons */
}
</style>
