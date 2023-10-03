import { APIError } from "./error";
import { raribleHttpClient } from "./raribleClient";
import axios from "axios";

export const itemAPI = {
  /**
   * Get an item.
   *
   * @param {itemId} item - item is a unique string
   */

  getItemsByOwnerWithOwnership: async (owner: string, continuation: string) => {
    let items;
    try {
      const output = await raribleHttpClient.get(
        `v0.1/items/byOwnerWithOwnership?owner=${owner}`
      );

      if (output && output.data && output.status === 200) {
        items = output.data;
      }
    } catch (error: any) {
      const output = error.response;
      const message = output?.data?.error?.message
        ? output?.data?.error?.message
        : "unable to get items by owner with ownership";
      throw new APIError(message, output?.status);
    }
    return items;
  },
};
