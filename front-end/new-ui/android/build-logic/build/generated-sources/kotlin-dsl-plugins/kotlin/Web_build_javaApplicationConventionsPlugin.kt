/**
 * Precompiled [web.build.java-application-conventions.gradle.kts][Web_build_java_application_conventions_gradle] script plugin.
 *
 * @see Web_build_java_application_conventions_gradle
 */
public
class Web_build_javaApplicationConventionsPlugin : org.gradle.api.Plugin<org.gradle.api.Project> {
    override fun apply(target: org.gradle.api.Project) {
        try {
            Class
                .forName("Web_build_java_application_conventions_gradle")
                .getDeclaredConstructor(org.gradle.api.Project::class.java, org.gradle.api.Project::class.java)
                .newInstance(target, target)
        } catch (e: java.lang.reflect.InvocationTargetException) {
            throw e.targetException
        }
    }
}
