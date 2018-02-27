<template>
  <div>
    <div class="page-title">Standard AQL</div>
    <mt-cell title="GENERAL LEVEL G-I" isLink @click.native=showDetail(calcuateTypeGI,calcuateTypeGIDesc) ></mt-cell>

    <mt-cell title="GENERAL LEVEL G-II" isLink @click.native=showDetail(calcuateTypeGII,calcuateTypeGIIDesc) ></mt-cell>

    <mt-cell title="GENERAL LEVEL G-III" isLink @click.native=showDetail(calcuateTypeGIII,calcuateTypeGIIIDesc) ></mt-cell>

    <mt-cell title="SPECIAL LEVEL S-1" isLink @click.native=showDetail(calcuateTypeS1,calcuateTypeS1Desc) ></mt-cell>

    <mt-cell title="SPECIAL LEVEL S-2" isLink @click.native=showDetail(calcuateTypeS2,calcuateTypeS2Desc) ></mt-cell>

    <mt-cell title="SPECIAL LEVEL S-3" isLink @click.native=showDetail(calcuateTypeS3,calcuateTypeS3Desc) ></mt-cell>

    <mt-cell title="SPECIAL LEVEL S-4" isLink @click.native=showDetail(calcuateTypeS4,calcuateTypeS4Desc) ></mt-cell>
  </div>

</template>


<style>
  .page-title {
    font-size: 20px;
    margin: 20px auto;
    text-align: center;
    display: block;
    line-height: 1;
  }
</style>



<script>
  export default {
    data() {
      return {
        active: 'aql',
        calcuateTypeGI: 'GI',
        calcuateTypeGIDesc: 'GENERAL LEVEL G-I',
        calcuateTypeGII: 'GII',
        calcuateTypeGIIDesc: 'GENERAL LEVEL G-II',
        calcuateTypeGIII: 'GIII',
        calcuateTypeGIIIDesc: 'GENERAL LEVEL G-III',
        calcuateTypeS1: 'S1',
        calcuateTypeS1Desc: 'SPECIAL LEVEL S-1',
        calcuateTypeS2: 'S2',
        calcuateTypeS2Desc: 'SPECIAL LEVEL S-2',
        calcuateTypeS3: 'S3',
        calcuateTypeS3Desc: 'SPECIAL LEVEL S-3',
        calcuateTypeS4: 'S4',
        calcuateTypeS4Desc: 'SPECIAL LEVEL S-4',
      };
    },
    methods: {
      showDetail(calculateType,calcuateTypeS3Desc){
        this.$router.push({name:'caculate', params: {type: calculateType,desc:calcuateTypeS3Desc }})
      }
    }
  }


</script>
