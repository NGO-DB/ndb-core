import { NavigationItemsService } from "./navigation-items.service";
import { MenuItem } from "./menu-item";

describe('navigation-items service tests', () => {

    it('adds menu item', function () {
        let navigationItemsService = new NavigationItemsService();
        let item = new MenuItem("test", "child", ['/']);

        navigationItemsService.addMenuItem(item);

        let items = navigationItemsService.getMenuItems();

        expect(items).toBeDefined();
        expect(items.length).toBe(1);
        expect(items[0]).toEqual(item);
    });

});
