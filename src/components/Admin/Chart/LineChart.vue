<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Line, mixins } from "vue-chartjs";
import { ChartData } from "chart.js";

@Component({
  extends: Line,
  mixins: [mixins.reactiveProp],
})
export default class extends Vue {
  @Prop()
  chartData!: ChartData;

  @Prop({
    default: function () {
      return {};
    },
  })
  options!: unknown;

  public renderChart!: (chartData: ChartData, options: any) => void;

  mounted() {
    this.renderChart(this.chartData, this.options);
  }
}
</script>