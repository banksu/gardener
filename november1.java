import java.util.regex.Pattern;

//import java.util.Scanner;

/**
 * november1
 * https://needjarvis.tistory.com/227
 * String Index
 * Search : "자바 문자 체크" by google
 */
public class november1 {
    public static void main(String[] args) {
        //Scanner scan = new Scanner(System.in);
        //System.out.println("Please pusy text");
        //String sentence = scan.nextLine();
       // System.out.println(sentence);
       // scan.close();
        String sentence="이제 매일매잏 1줄이라도 코딩할꺼양";
        String[] words = sentence.split(" ");

        for (String word : words){
            System.out.println(word+"=>"+getType(word));
        }
    }

    //정규 표현식
    //문자의 영문,숫자,한글 여부를 리턴
    //@param word
    //@return
   public static boolean getType(String word) {
       return Pattern.matches(("^[0-9a-zA-Z가-힣]*$"), word);
       
   }
}


//라이브러리 다운로드 부분부터는 다음에...