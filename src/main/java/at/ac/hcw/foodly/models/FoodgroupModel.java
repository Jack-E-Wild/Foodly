package at.ac.hcw.foodly.models;

public class FoodgroupModel {
    private String fgName;
    private String fgIcon;

    public FoodgroupModel(String fgName, String fgIcon) {

    }

    public void setFgName(String fgName) {
        this.fgName = fgName;
    }

    public void setFgIcon(String fgIcon) {
        this.fgIcon = fgIcon;
    }

    public String getFgName() {
        return fgName;
    }

    public String getFgIcon() {
        return fgIcon;
    }


}
