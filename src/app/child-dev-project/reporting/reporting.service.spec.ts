import { TestBed } from "@angular/core/testing";

import { Disaggregation, ReportingService } from "./reporting.service";
import { ConfigService } from "../../core/config/config.service";
import { Child } from "../children/model/child";
import { QueryService } from "./query.service";

describe("ReportingService", () => {
  let service: ReportingService;
  let mockConfigService: jasmine.SpyObj<ConfigService>;
  let mockQueryService: jasmine.SpyObj<QueryService>;

  beforeEach(() => {
    mockConfigService = jasmine.createSpyObj(["getConfig"]);
    mockQueryService = jasmine.createSpyObj(["queryAllData", "queryData"]);
    TestBed.configureTestingModule({
      providers: [
        { provide: ConfigService, useValue: mockConfigService },
        { provide: QueryService, useValue: mockQueryService },
      ],
    });
    service = TestBed.inject(ReportingService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should load the disaggregations from the config", () => {
    service.loadDisaggregationsFromConfig();
    expect(mockConfigService.getConfig).toHaveBeenCalledWith(
      ReportingService.DISAGGREGATIONS_CONFIG_KEY
    );
  });

  it("should run the disaggregation queries and return the results", async () => {
    const baseQuery = `${Child.ENTITY_TYPE}:toArray`;
    const christiansQuery = "[*religion=christian]";
    const muslimsQuery = "[*religion=muslim]";
    const childDisaggregation: Disaggregation = {
      baseQuery: baseQuery,
      aggregations: [
        { label: "christians", query: christiansQuery },
        { label: "muslims", query: muslimsQuery },
      ],
    };
    mockConfigService.getConfig.and.returnValue([childDisaggregation]);
    mockQueryService.queryAllData.and.resolveTo([]);
    mockQueryService.queryData.and.returnValues(
      Promise.resolve(1),
      Promise.resolve(2)
    );
    service.loadDisaggregationsFromConfig();
    const report = await service.calculateDisaggregations();
    expect(mockQueryService.queryAllData).toHaveBeenCalledWith(baseQuery);
    expect(mockQueryService.queryData.calls.allArgs()).toEqual([
      [christiansQuery, []],
      [muslimsQuery, []],
    ]);
    expect(report).toEqual([
      { label: "christians", result: 1 },
      { label: "muslims", result: 2 },
    ]);
  });
});
