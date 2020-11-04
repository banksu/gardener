
import java.util.Scanner;

public class Gugudan {
    int danNum;
    boolean comp=false;

    public Gugudan(){

        getDan();
        setDan();
        replay();
        //2dan

    }
        
        // System.out.println("2dan");
        // System.out.println(2*1);
        // System.out.println(2*2);
        // System.out.println(2*3);
        // System.out.println(2*4);
        // System.out.println(2*5);
        // System.out.println(2*6);
        // System.out.println(2*7);
        // System.out.println(2*8);
        // System.out.println(2*9);
        
    
    void getDan(){
        Scanner sc = new Scanner(System.in);
        System.out.println("What is your want?");
        this.danNum=sc.nextInt();
    }
    void setDan(){
        for (int i = 1; i < 10; i++) {
            System.out.println(danNum+" * "+i+" = "+(danNum*i));
            
        }
        comp=true;
    }
    void replay(){
        if(comp){
            new Gugudan();
        }
    }
}
